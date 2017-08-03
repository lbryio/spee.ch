const lbryApi = require('../helpers/lbryApi.js');
const db = require('../models');
const logger = require('winston');
const getAllFreePublicClaims = require('../helpers/functions/getAllFreePublicClaims.js');
const isFreePublicClaim = require('../helpers/functions/isFreePublicClaim.js');
const serveHelpers = require('../helpers/serveHelpers.js');

module.exports = {
  showClaimByName (claimName) {
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
            .then(result => {
              // 3. if a matching record is found locally, serve it
              if (result) {
                // return the data for the file to be served
                result.dataValues['fileExt'] = result.fileName.substring(result.fileName.lastIndexOf('.'));
                serveHelpers.getShortUrlByClaimId(name, claimId)
                  .then(shortUrl => {
                    result.dataValues['shortUrl'] = shortUrl;
                    resolve(result.dataValues);
                  })
                  .catch(error => reject(error));
                // trigger update if needed
                serveHelpers.updateFileIfNeeded(uri, result.dataValues.outpoint, result.dataValues.height);
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
  showClaimByClaimId (name, claimId) {
    logger.debug(`Getting claim name: ${name} by claimid: ${claimId}`);
    const deferred = new Promise((resolve, reject) => {
      // 1. check locally for the claim
      const uri = `${name}#${claimId}`;
      db.File
        .findOne({ where: { name, claimId } })
        .then(result => {
          // 3. if a match is found locally, serve that claim
          if (result) {
            logger.debug('local result found');
            // return the data for the file to be served
            result.dataValues['fileExt'] = result.fileName.substring(result.fileName.lastIndexOf('.'));
            serveHelpers.getShortUrlByClaimId(name, claimId)
              .then(shortUrl => {
                result.dataValues['shortUrl'] = shortUrl;
                resolve(result.dataValues);
              })
              .catch(error => reject(error));
            // update the file, as needed
            serveHelpers.updateFileIfNeeded(uri, result.dataValues.outpoint, result.dataValues.outpoint);
          // 3. if a match was not found locally, use the daemon to retrieve the claim & return the db data once it is created
          } else {
            logger.debug('no local result found');
            lbryApi
              .resolveUri(uri)
              .then(result => {
                logger.debug('resolve returned successfully');
                if (result.claim && isFreePublicClaim(result.claim)) { // check to see if the claim is free & public
                  // get claim and serve
                  serveHelpers.getClaimAndReturnResponse(uri, result.claim.address, result.claim.height)
                    .then(result => {
                      logger.debug('get request returned');
                      serveHelpers.getShortUrlByClaimId(name, claimId)
                        .then(shortUrl => {
                          result.dataValues['shortUrl'] = shortUrl;
                          resolve(result.dataValues);
                        })
                        .catch(error => reject(error));
                    })
                    .catch(error => reject(error));
                } else {
                  logger.debug('Resolve did not return a free, public claim');
                  resolve(null, null);
                }
              })
              .catch(error => {
                logger.debug('resolve returned an error');
                reject(error);
              });
          }
        })
        .catch(error => reject(error));
    });
    return deferred;
  },
  showClaimByShortUrl (name, shortUrl) {
    const deferred = new Promise((resolve, reject) => {
      let uri;
      let claimId;
      // 1. validate the claim id & retrieve the full claim id if needed
      serveHelpers.getClaimIdByShortUrl(name, shortUrl)
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
            result.dataValues['fileExt'] = result.fileName.substring(result.fileName.lastIndexOf('.'));
            result.dataValues['shortUrl'] = shortUrl;
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
                  serveHelpers.getClaimAndReturnResponse(uri, result.claim.address, result.claim.height)
                    .then(result => {
                      logger.debug('returned');
                      result.dataValues['shortUrl'] = shortUrl;
                      resolve(result.dataValues);
                    })
                    .catch(error => reject(error));
                } else {
                  logger.debug('Resolve did not return a free, public claim');
                  resolve(null, null);
                }
              })
              .catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });
    return deferred;
  },
  showAllClaims (claimName) {
    return getAllFreePublicClaims(claimName);
  },
};
