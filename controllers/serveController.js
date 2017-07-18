const lbryApi = require('../helpers/libraries/lbryApi.js');
const db = require('../models');
const logger = require('winston');
const getAllFreePublicClaims = require('../helpers/functions/getAllFreePublicClaims.js');
const isFreePublicClaim = require('../helpers/functions/isFreePublicClaim.js');
const { validateClaimId } = require('../helpers/libraries/serveHelpers.js');

function updateFileIfNeeded (uri, claimName, claimId, localOutpoint, localHeight) {
  logger.debug(`Initiating resolve to check outpoint for ${claimName}:${claimId}.`);
  // 1. resolve claim
  lbryApi
    .resolveUri(uri)
    .then(result => {
      // check to make sure the result is a claim
      if (!result.claim) {
        logger.debug('resolve did not return a claim');
        return;
      }
      // logger.debug('resolved result:', result);
      const resolvedOutpoint = `${result.claim.txid}:${result.claim.nout}`;
      const resolvedHeight = result.claim.height;
      const resolvedAddress = result.claim.address;
      logger.debug('database outpoint:', localOutpoint);
      logger.debug('resolved outpoint:', resolvedOutpoint);
      // 2. if the outpoint's match, no further work needed
      if (localOutpoint === resolvedOutpoint) {
        logger.debug('local outpoint matched');
      // 2. if the outpoints don't match, check the height
      } else if (localHeight > resolvedHeight) {
        logger.debug('local height was greater than resolved height');
      // 2. get the resolved claim
      } else {
        logger.debug(`local outpoint did not match for ${uri}.  Initiating update.`);
        getClaimAndUpdate(uri, resolvedAddress, resolvedHeight);
      }
    })
    .catch(error => {
      logger.error(error);
    });
}

function getClaimAndUpdate (uri, address, height) {
  // 1. get the claim
  lbryApi
    .getClaim(uri)
    .then(({ name, claim_id, outpoint, file_name, download_path, mime_type, metadata }) => {
      logger.debug(' Get returned outpoint: ', outpoint);
      // 2. update the entry in db
      db.File
        .update({
          outpoint,
          height, // note: height is coming from the 'resolve', not 'get'.
          address,  // note: address is coming from the 'resolve', not 'get'.
          fileName: file_name,
          filePath: download_path,
          fileType: mime_type,
          nsfw    : metadata.stream.metadata.nsfw,
        }, {
          where: {
            name,
            claimId: claim_id,
          },
        })
        .then(result => {
          logger.debug('successfully updated mysql record', result);
        })
        .catch(error => {
          logger.error('sequelize error', error);
        });
    })
    .catch(error => {
      logger.error(`error while getting claim for ${uri} >> `, error);
    });
}

function getClaimAndHandleResponse (uri, address, height, resolve, reject) {
  lbryApi
    .getClaim(uri)
    .then(({ name, claim_id, outpoint, file_name, download_path, mime_type, metadata }) => {
      // create entry in the db
      logger.silly(`creating "${name}" record in File db`);
      db.File
        .create({
          name,
          claimId : claim_id,
          address,  // note: comes from parent 'resolve,' not this 'get' call
          outpoint,
          height, // note: comes from parent 'resolve,' not this 'get' call
          fileName: file_name,
          filePath: download_path,
          fileType: mime_type,
          nsfw    : metadata.stream.metadata.nsfw,
        })
        .then(result => {
          logger.debug('successfully created mysql record');
        })
        .catch(error => {
          logger.error('sequelize create error', error);
        });
      // resolve the request
      resolve({
        name,
        claimId : claim_id,
        fileName: file_name,
        filePath: download_path,
        fileType: mime_type,
      });
    })
    .catch(error => {
      reject(error);
    });
}

function getClaimAndReturnResponse (uri, address, height) {
  const deferred = new Promise((resolve, reject) => {
    lbryApi
      .getClaim(uri)
      .then(({ name, claim_id, outpoint, file_name, download_path, mime_type, metadata }) => {
        // create entry in the db
        logger.silly(`creating new File record`);
        db.File
          .create({
            name,
            claimId : claim_id,
            address,  // note: passed as an arguent, not from this 'get' call
            outpoint,
            height, // note: passed as an arguent, not from this 'get' call
            fileName: file_name,
            filePath: download_path,
            fileType: mime_type,
            nsfw    : metadata.stream.metadata.nsfw,
          })
          .then(result => {
            logger.debug('successfully created File record');
            resolve(result); // note: result.dataValues ?
          })
          .catch(error => {
            logger.error('sequelize create error', error);
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
  return deferred;
}

module.exports = {
  getClaimByName (claimName) {
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
                updateFileIfNeeded(uri, name, claimId, claim.dataValues.outpoint, claim.dataValues.height);
              // 3. otherwise use daemon to retrieve it
              } else {
                // get the claim and serve it
                getClaimAndHandleResponse(uri, address, height, resolve, reject);
              }
            })
            .catch(error => {
              logger.error('sequelize error', error);
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
    return deferred;
  },
  getClaimByClaimId (name, claimId) {
    const deferred = new Promise((resolve, reject) => {
      let uri;
      validateClaimId(name, claimId)  // 1. validate the claim id & retrieve the full claim id if needed
        .then(validClaimId => {  // 2. check locally for the claim
          logger.debug('valid claim id:', validClaimId);
          uri = `${name}#${validClaimId}`;
          return db.File.findOne({ where: { name, claimId: validClaimId } });
        })
        .then(result => {
          // 3. if a match is found locally, serve that claim
          if (result) {
            logger.debug('Result found in File table:', result.dataValues);
            // return the data for the file to be served
            resolve(result.dataValues);
            // update the file, as needed
            updateFileIfNeeded(uri, name, claimId, result.dataValues.outpoint, result.dataValues.outpoint);
          // 3. if a match was not found use the daemon to retrieve the claim & return the db data once it is created
          } else {
            logger.debug('No result found in File table');
            lbryApi
              .resolveUri(uri)
              .then(result => {
                if (!result.claim) { // check to make sure the result is a claim
                  logger.debug('resolve did not return a claim');
                  resolve(null);
                }
                if (isFreePublicClaim(result.claim)) { // check to see if the claim is free & public
                  // get claim and serve
                  resolve(getClaimAndReturnResponse(uri, result.claim.address, result.claim.height));
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
    return deferred;
  },
  getAllClaims (claimName) {
    return getAllFreePublicClaims(claimName);
  },
};
