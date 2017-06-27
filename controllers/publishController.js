const logger = require('winston');
const db = require('../models');
const lbryApi = require('../helpers/libraries/lbryApi.js');
const publishHelpers = require('../helpers/libraries/publishHelpers.js');

function upsert (Model, values, condition) {
  return Model
    .findOne({ where: condition })
    .then(function (obj) {
      if (obj) {  // update
        return obj.update(values);
      } else {  // insert
        return Model.create(values);
      }
    }).catch(function (error) {
      logger.error('Sequelize findOne error', error);
    });
}

module.exports = {
  publish: (publishParams, fileName, fileType) => {
    const deferred = new Promise((resolve, reject) => {
      // 1. publish the file
      lbryApi
        .publishClaim(publishParams)
        .then(result => {
          logger.info(`Successfully published ${fileName}`, result);
          // 2. update old record of create new one (update is in case the claim has been published before by this daemon)
          upsert(
            db.File,
            {
              name    : publishParams.name,
              claimId : result.claim_id,
              outpoint: `${result.txid}:${result.nout}`,
              height  : 0,
              fileName,
              filePath: publishParams.file_path,
              fileType,
              nsfw    : publishParams.metadata.nsfw,
            },
            { name: publishParams.name, claimId: result.claim_id }
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
          logger.error(`Error publishing ${fileName}`, error);
          // delete the local file
          publishHelpers.deleteTemporaryFile(publishParams.file_path);
          // reject the promise
          reject(error);
        });
    });
    return deferred;
  },
};
