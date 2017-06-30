const lbryApi = require('../helpers/libraries/lbryApi.js');
const db = require('../models');
const logger = require('winston');
const getAllFreePublicClaims = require('../helpers/functions/getAllFreePublicClaims.js');
const isFreePublicClaim = require('../helpers/functions/isFreePublicClaim.js');

function updateFileIfNeeded (uri, claimName, claimId, localOutpoint, localHeight) {
  logger.debug(`A mysql record was found for ${claimName}:${claimId}. Initiating resolve to check outpoint.`);
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
        getClaimAndUpdate(uri, resolvedHeight);
      }
    })
    .catch(error => {
      logger.error(`error resolving "${uri}" >> `, error);
    });
}

function getClaimAndUpdate (uri, height) {
  // 1. get the claim
  lbryApi
    .getClaim(uri)
    .then(({ name, claim_id, outpoint, file_name, download_path, mime_type, metadata }) => {
      logger.debug(' Get returned outpoint: ', outpoint);
      // 2. update the entry in db
      db.File
        .update({
          outpoint,
          height, // note: height is coming from 'resolve', not 'get'.
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

function getClaimAndHandleResponse (uri, height, resolve, reject) {
  lbryApi
    .getClaim(uri)
    .then(({ name, claim_id, outpoint, file_name, download_path, mime_type, metadata }) => {
      // create entry in the db
      logger.debug('creating new record in db');
      db.File
        .create({
          name,
          claimId : claim_id,
          outpoint,
          height,
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
        fileName: file_name,
        filePath: download_path,
        fileType: mime_type,
      });
    })
    .catch(error => {
      reject(error);
    });
}

module.exports = {
  getClaimByName (claimName) {
    const deferred = new Promise((resolve, reject) => {
      // 1. get the top free, public claims
      getAllFreePublicClaims(claimName)
        .then(freePublicClaimList => {
          const name = freePublicClaimList[0].name;
          const claimId = freePublicClaimList[0].claim_id;
          const uri = `${name}#${claimId}`;
          const height = freePublicClaimList[0].height;
          // 2. check to see if the file is available locally
          db.File
            .findOne({ where: { name, claimId } })
            .then(claim => {
              // 3. if a matching claim_id is found locally, serve it
              if (claim) {
                // serve the file
                resolve(claim.dataValues);
                // trigger update if needed
                updateFileIfNeeded(uri, name, claimId, claim.dataValues.outpoint, claim.dataValues.height);
              // 3. otherwise use daemon to retrieve it
              } else {
                // get the claim and serve it
                getClaimAndHandleResponse(uri, height, resolve, reject);
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
      const uri = `${name}#${claimId}`;
      // 1. check locally for the claim
      db.File
        .findOne({ where: { name, claimId } })
        .then(claim => {
          // 2. if a match is found locally, serve it
          if (claim) {
            // serve the file
            resolve(claim.dataValues);
            // trigger an update if needed
            updateFileIfNeeded(uri, name, claimId, claim.dataValues.outpoint, claim.dataValues.outpoint);
          // 2. otherwise use daemon to retrieve it
          } else {
            // 3. resolve the Uri
            lbryApi
              .resolveUri(uri)
              .then(result => {
                // check to make sure the result is a claim
                if (!result.claim) {
                  logger.debug('resolve did not return a claim');
                  reject('NO_FREE_PUBLIC_CLAIMS');  // note: should be a resolve not a reject! but I need routes to handle that properly. right now it is handled as an error.
                  return;
                }
                // 4. check to see if the claim is free & public
                if (isFreePublicClaim(result.claim)) {
                  // 5. get claim and serve
                  getClaimAndHandleResponse(uri, result.claim.height, resolve, reject);
                } else {
                  reject('NO_FREE_PUBLIC_CLAIMS');  // note: should be a resolve not a reject! but I need routes to handle that properly. right now it is handled as an error.
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
};
