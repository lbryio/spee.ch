const logger = require('winston');
const db = require('../models');
const lbryApi = require('../helpers/lbryApi.js');
const publishHelpers = require('../helpers/publishHelpers.js');

function checkNameAvailability (name) {
  return new Promise((resolve, reject) => {
    // find any records where the name is used
    db.File
      .findAll({ where: { name } })
      .then(result => {
        if (result.length >= 1) {
          // filter out any results that were not published from a spee.ch wallet address
          lbryApi
            .getWalletList()
            .then((walletList) => {
              const filteredResult = result.filter((claim) => {
                return walletList.includes(claim.address);
              });
              if (filteredResult.length >= 1) {
                resolve(false);
              } else {
                resolve(true);
              }
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve(true);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  publish (publishParams, fileName, fileType) {
    return new Promise((resolve, reject) => {
      // 1. make sure the name is available
      checkNameAvailability(publishParams.name)
      .then(result => {
        if (result === true) {
          // 2. publish the file
          lbryApi
            .publishClaim(publishParams)
            .then(result => {
              logger.info(`Successfully published ${fileName}`, result);
              // 3. update old record or create new one (update is in case the claim has been published before by this daemon)
              db.upsert(
                db.File,
                {
                  name    : publishParams.name,
                  claimId : result.claim_id,
                  address : publishParams.claim_address,
                  outpoint: `${result.txid}:${result.nout}`,
                  height  : 0,
                  fileName,
                  filePath: publishParams.file_path,
                  fileType,
                  nsfw    : publishParams.metadata.nsfw,
                },
                {
                  name   : publishParams.name,
                  claimId: result.claim_id,
                }
              ).then(() => {
                // resolve the promise with the result from lbryApi.publishClaim;
                resolve(result);
              })
              .catch(error => {
                logger.error('Sequelize findOne error', error);
                // reject the promise
                reject(error);
              });
            })
            .catch(error => {
              // delete the local file
              publishHelpers.deleteTemporaryFile(publishParams.file_path);
              // reject the promise
              reject(error);
            });
        } else {
          const err = new Error('That name has already been claimed by spee.ch.  Please choose a new claim name.');
          reject(err);
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  },
  checkNameAvailability (name) {
    return checkNameAvailability(name);
  },
};
