const lbryApi = require('../helpers/libraries/lbryApi.js');
const db = require('../models');
const logger = require('winston');
const getAllFreePublicClaims = require('../helpers/functions/getAllFreePublicClaims.js');
const isFreePublicClaim = require('../helpers/functions/isFreePublicClaim.js');

function getClaimAndHandleResponse (claimUri, resolve, reject) {
  logger.debug(`getClaimAndHandleResponse start for ${claimUri}`);
  lbryApi
    .getClaim(claimUri)
    .then(({ file_name, download_path, mime_type }) => {
      resolve({
        fileName: file_name,
        filePath: download_path,
        fileType: mime_type,
      });
    })
    .catch(error => {
      logger.error(`getClaimAndHandleResponse error for ${claimUri}`);
      reject(error);
    });
}

module.exports = {
  getClaimByName (claimName) {
    logger.debug(`getClaimByName start for ${claimName}`);
    const deferred = new Promise((resolve, reject) => {
      // get all free public claims
      getAllFreePublicClaims(claimName)
        .then(freePublicClaimList => {
          const claimId = freePublicClaimList[0].claim_id;
          const name = freePublicClaimList[0].name;
          const freePublicClaimOutpoint = `${freePublicClaimList[0].txid}:${freePublicClaimList[0].nout}`;
          const freePublicClaimUri = `${name}#${claimId}`;
          // check to see if the file is available locally
          db.File
            .findOne({ where: { name: name, claimId: claimId } })
            .then(claim => {
              // if a matching claim is found locally...
              if (claim) {
                // if the outpoint's match return it
                if (claim.dataValues.outpoint === freePublicClaimOutpoint) {
                  logger.debug(`local outpoint matched for ${name} ${claimId} `);
                  resolve(claim.dataValues);
                // if the outpoint's don't match, fetch updated claim
                } else {
                  logger.debug(`local outpoint did not match ${name} ${claimId}`);
                  getClaimAndHandleResponse(freePublicClaimUri, resolve, reject);
                }
              // ... otherwise use daemon to retrieve it
              } else {
                getClaimAndHandleResponse(freePublicClaimUri, resolve, reject);
              }
            })
            .catch(error => {
              logger.error('Sequelize encountered an error', error);
              reject(error);
            });
        })
        .catch(error => {
          logger.debug(`getClaimByName failure for ${claimName}`);
          reject(error);
        });
    });
    return deferred;
  },
  getClaimByClaimId (claimName, claimId) {
    logger.debug(`getClaimByClaimId start for ${claimName}`);
    const deferred = new Promise((resolve, reject) => {
      const uri = `${claimName}#${claimId}`;
      // resolve the Uri
      lbryApi
        .resolveUri(uri) // note: use 'spread' and make parallel with db.File.findOne()
        .then(result => {
          const resolvedOutpoint = `${result[uri].claim.txid}:${result[uri].claim.nout}`;
          // check locally for the claim
          db.File
            .findOne({ where: { name: claimName, claimId: claimId } })
            .then(claim => {
              // if a found locally...
              if (claim) {
                logger.debug(`A record was found for ${claimName} ${claimId}`);
                // if the outpoint's match return it
                if (claim.dataValues.outpoint === resolvedOutpoint) {
                  logger.debug(`local outpoint matched for ${claimName} ${claimId}`);
                  resolve(claim.dataValues);
                  // if the outpoint's don't match, fetch updated claim
                } else {
                  logger.debug(`local outpoint did not match ${claimName} ${claimId}`);
                  getClaimAndHandleResponse(uri, resolve, reject);
                }
                // ... otherwise use daemon to retrieve it
              } else {
                if (isFreePublicClaim(result[uri].claim)) {
                  getClaimAndHandleResponse(uri, resolve, reject);
                } else {
                  reject('NO_FREE_PUBLIC_CLAIMS');
                }
              }
            })
            .catch(error => {
              logger.error('Sequelize encountered an error', error);
              reject(error);
            });
        })
        .catch(error => {
          logger.debug(`getClaimByClaimId error for ${claimName}`);
          reject(error);
        });
    });
    return deferred;
  },
};
