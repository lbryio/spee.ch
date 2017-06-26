const fs = require('fs');
const logger = require('winston');
const lbryApi = require('../helpers/libraries/lbryApi.js');
const db = require('../models');

function deleteTemporaryFile (filePath) {
  fs.unlink(filePath, err => {
    if (err) throw err;
    logger.debug(`successfully deleted ${filePath}`);
  });
}

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
          ).catch(error => {
            logger.error('Sequelize findOne error', error);
          });
        })
        .catch(error => {
          logger.error(`Error publishing ${fileName}`, error);
          // delete the local file
          deleteTemporaryFile(publishParams.file_path);
        });
    });
    return deferred;
  },
};
