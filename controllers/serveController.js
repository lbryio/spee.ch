const lbryApi = require('../helpers/libraries/lbryApi.js');
const db = require('../models');
const logger = require('winston');
const getAllFreePublicClaims = require('../helpers/functions/getAllFreePublicClaims.js');
const isFreePublicClaim = require('../helpers/functions/isFreePublicClaim.js');
const serveHelpers = require('../helpers/libraries/serveHelpers.js');

function checkForLocalAssetByShortUrl (channel, name) {
  return new Promise((resolve, reject) => {
    db.File
      .findOne({where: { name, channel }})
      .then(result => {
        if (result) {
          resolve(result.dataValues);
        } else {
          resolve(null);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function checkForLocalAssetByChannel (channelName, name) {
  return new Promise((resolve, reject) => {

  });
}

function checkForLocalAssetByClaimId (claimId, name) {
  return new Promise((resolve, reject) => {
    db.File
      .findOne({where: { name, claimId }})
      .then(result => {
        if (result) {
          resolve(result.dataValues);
        } else {
          resolve(null);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function formatGetResultsToFileInfo ({ name, claim_id, outpoint, file_name, download_path, mime_type, metadata }) {
  return {
    name,
    claimId : claim_id,
    outpoint,
    fileName: file_name,
    filePath: download_path,
    fileType: mime_type,
    nsfw    : metadata.stream.metadata.nsfw,
  };
}

module.exports = {
  getAssetByChannel (channelName, name) {
    return new Promise((resolve, reject) => {
      // check locally for claim
      checkForLocalAssetByChannel(channelName, name)
        .then(result => {
          // if not found locally, make a get request
          if (!result) {
            resolve();
          // if a result was found, resolve the result
          } else {
            resolve(result);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getAssetByShortUrl (shortUrl, name) {
    return new Promise((resolve, reject) => {
      // check locally for claim
      checkForLocalAssetByShortUrl(shortUrl, name)
      .then(result => {
        // if not found locally, make a get request
        if (!result) {
          resolve();
        // if a result was found, resolve the result
        } else {
          resolve(result);
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  },
  getAssetByClaimId (fullClaimId, name) {
    return new Promise((resolve, reject) => {
      // 1. check locally for claim
      checkForLocalAssetByClaimId(fullClaimId, name)
      .then(dataValues => {
        // 2. if a result was found, resolve the result
        if (dataValues) {
          logger.debug('found a local file for this claimId');
          // trigger an update check for the file
          serveHelpers.updateFileIfNeeded(dataValues.name, dataValues.claimId, dataValues.outpoint, dataValues.height);
          // resolve promise
          resolve(dataValues);
        // 2. if not found locally, make a get request
        } else {
          logger.debug('no local file for this claimId');
          // 3. resolve the claim
          lbryApi.resolveUri(`${name}#${fullClaimId}`)
          .then(resolveResult => {
            // if the claim is free and public, then get it
            if (resolveResult.claim && isFreePublicClaim(resolveResult.claim)) {
              lbryApi.getClaim(`${name}#${fullClaimId}`)
              .then(getResult => {
                let fileInfo = formatGetResultsToFileInfo(getResult);
                fileInfo['address'] = resolveResult.claim.address;
                fileInfo['height'] = resolveResult.claim.height;
                resolve(fileInfo);
              })
              .catch(error => {
                reject(error);
              });
            // if not, resolve with no claims
            } else {
              resolve(null);
            }
          })
          .catch(error => {
            reject(error);
          });
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  },
  serveClaimByName (claimName) {
    const deferred = new Promise((resolve, reject) => {
      // 1. get the top free, public claims
      getAllFreePublicClaims(claimName)
        .then(freePublicClaimList => {
          // check to make sure some claims were found
          if (!freePublicClaimList) {
            resolve(null);
            return;
          }
          const name = freePublicClaimList[0].name;
          const claimId = freePublicClaimList[0].claim_id;
          const uri = `${name}#${claimId}`;
          const height = freePublicClaimList[0].height;
          const address = freePublicClaimList[0].address;
          // 2. check to see if the file is available locally
          db.File
            .findOne({ where: { name, claimId } })
            .then(claim => {
              // 3. if a matching record is found locally, serve it
              if (claim) {
                // serve the file
                resolve(claim.dataValues);
                // trigger update if needed
                serveHelpers.updateFileIfNeeded(uri, claim.dataValues.outpoint, claim.dataValues.height);
              // 3. otherwise use daemon to retrieve it
              } else {
                // get the claim and serve it
                serveHelpers.getClaimAndHandleResponse(uri, address, height, resolve, reject);
              }
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
    return deferred;
  },

  serveClaimByShortUrl (name, shortUrl) {
    const deferred = new Promise((resolve, reject) => {
      let uri;
      let claimId;
      // 1. validate the claim id & retrieve the full claim id if needed
      serveHelpers
        .getClaimIdByShortUrl(name, shortUrl)
        .then(result => {
          // 2. check locally for the claim
          uri = `${name}#${result}`;
          claimId = result;
          return db.File.findOne({ where: { name, claimId } });
        })
        .then(result => {
          // 3. if a match is found locally, serve that claim
          if (result) {
            // return the data for the file to be served
            resolve(result.dataValues);
            // update the file, as needed
            serveHelpers.updateFileIfNeeded(uri, result.dataValues.outpoint, result.dataValues.outpoint);
          // 3. if a match was not found locally, use the daemon to retrieve the claim & return the db data once it is created
          } else {
            lbryApi
              .resolveUri(uri)
              .then(result => {
                if (result.claim && isFreePublicClaim(result.claim)) { // check to see if the claim is free & public
                  // get claim and serve
                  serveHelpers
                    .getClaimAndReturnResponse(uri, result.claim.address, result.claim.height)
                    .then(result => {
                      resolve(result.dataValues);
                    })
                    .catch(error => reject(error));
                } else {
                  logger.debug('Resolve did not return a free, public claim');
                  resolve(null);
                }
              })
              .catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });
    return deferred;
  },
};
