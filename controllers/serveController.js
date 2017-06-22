const lbryApi = require('../helpers/libraries/lbryApi.js');
const db = require('../models');
const logger = require('winston');
const getAllFreePublicClaims = require('../helpers/functions/getAllFreePublicClaims.js');
const isFreePublicClaim = require('../helpers/functions/isFreePublicClaim.js');

function getClaimAndHandleResponse (claimUri, resolve, reject) {
  lbryApi
    .getClaim(claimUri)
    .then(({ name, outpoint, claim_id, file_name, download_path, mime_type, metadata }) => {
      // create entry in the db
      logger.debug('creating new record in db');
      db.File
        .create({
          name,
          claimId : claim_id,
          outpoint,
          fileName: file_name,
          filePath: download_path,
          fileType: mime_type,
          nsfw    : metadata.stream.metadata.nsfw,
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

function resolveAndUpdateIfNeeded (uri, claimName, claimId, outpoint) {
  logger.debug('initiating resolve on local record to check outpoint');
  // 1. resolve claim
  lbryApi
    .resolveUri(uri)
    .then(result => {
      // logger.debug('resolved result:', result);
      const resolvedOutpoint = `${result[uri].claim.txid}:${result[uri].claim.nout}`;
      logger.debug('database outpoint:', outpoint);
      logger.debug('resolved outpoint:', resolvedOutpoint);
      // 2. if the outpoint's match, no further work needed
      if (outpoint === resolvedOutpoint) {
        logger.debug(`local outpoint matched`);
      // 2. if the outpoints don't match, get claim and update records
      } else {
        logger.debug(`local outpoint did not match for ${uri}.  Initiating update.`);
        getClaimAndUpdate(uri, claimName, claimId);
      }
    })
    .catch(error => {
      logger.error(`error resolving ${uri}`, error);
    });
}

function getClaimAndUpdate (uri, claimName, claimId) {
  // 1. get the claim
  lbryApi
    .getClaim(uri)
    .then(({ outpoint, file_name, download_path, mime_type }) => {
      logger.debug('getClaim outpoint', outpoint);
      // 2. update the entry in db
      db.File
        .update({
          outpoint: outpoint,
          fileName: file_name,
          filePath: download_path,
          fileType: mime_type,
        }, {
          where: {
            name   : claimName,
            claimId: claimId,
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
      logger.error(`error while getting claim for ${uri}`, error);
    });
}

module.exports = {
  getClaimByName (claimName) {
    const deferred = new Promise((resolve, reject) => {
      // 1. get all free public claims
      getAllFreePublicClaims(claimName)
        .then(freePublicClaimList => {
          const claimId = freePublicClaimList[0].claim_id;
          const name = freePublicClaimList[0].name;
          const freePublicClaimOutpoint = `${freePublicClaimList[0].txid}:${freePublicClaimList[0].nout}`;
          const freePublicClaimUri = `${name}#${claimId}`;
          // 2. check to see if the file is available locally
          db.File
            .findOne({ where: { name: name, claimId: claimId } })  // note: consolidate for es6?
            .then(claim => {
              // 3. if a matching claim_id is found locally, serve it
              if (claim) {
                logger.debug(`A mysql record was found for ${claimId}`);
                // trigger update if needed
                if (claim.dataValues.outpoint === freePublicClaimOutpoint) {
                  logger.debug(`local outpoint matched for ${claimId}`);
                } else {
                  logger.debug(`local outpoint did not match for ${claimId}`);
                  getClaimAndUpdate(freePublicClaimUri, name, claimId);
                }
                // return the claim
                resolve(claim.dataValues);
              // 3. otherwise use daemon to retrieve it
            } else {
                // 4. get the claim and serve it
                getClaimAndHandleResponse(freePublicClaimUri, resolve, reject);
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
  getClaimByClaimId (claimName, claimId) {
    const deferred = new Promise((resolve, reject) => {
      const uri = `${claimName}#${claimId}`;
      // 1. check locally for the claim
      db.File
        .findOne({ where: { name: claimName, claimId: claimId } })  // note: consolidate for es6?
        .then(claim => {
          // 2. if a match is found locally, serve it
          if (claim) {
            logger.debug(`A mysql record was found for ${claimId}`);
            // trigger an update if needed
            resolveAndUpdateIfNeeded(uri, claimName, claimId, claim.dataValues.outpoint);  // ok to just start asynch function, or need to add to a task cue?
            // resolve and send
            resolve(claim.dataValues);
          // 2. otherwise use daemon to retrieve it
          } else {
            // 3. resolve the Uri
            lbryApi
              .resolveUri(uri)
              .then(result => {
                // 4. check to see if the claim is free & public
                if (isFreePublicClaim(result[uri].claim)) {
                  // 5. get claim and serve
                  getClaimAndHandleResponse(uri, resolve, reject);
                } else {
                  reject('NO_FREE_PUBLIC_CLAIMS');
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
