const logger = require('winston');
const db = require('../models');
const lbryApi = require('../helpers/lbryApi.js');
const publishHelpers = require('../helpers/publishHelpers.js');

module.exports = {
  publish (publishParams, fileName, fileType) {
    return new Promise((resolve, reject) => {
      let publishResults = {};
      // 1. make sure the name is available
      publishHelpers.checkClaimNameAvailability(publishParams.name)
      // 2. publish the file
      .then(result => {
        if (result === true) {
          return lbryApi.publishClaim(publishParams);
        } else {
          return new Error('That name has already been claimed by spee.ch.  Please choose a new claim name.');
        }
      })
      // 3. upsert File record (update is in case the claim has been published before by this daemon)
      .then(result => {
        let fileRecord;
        let upsertCriteria;
        publishResults = result;
        logger.info(`Successfully published ${fileName}`, publishResults);
        fileRecord = {
          name       : publishParams.name,
          claimId    : publishResults.claim_id,
          title      : publishParams.metadata.title,
          description: publishParams.metadata.description,
          address    : publishParams.claim_address,
          outpoint   : `${publishResults.txid}:${publishResults.nout}`,
          height     : 0,
          fileName,
          filePath   : publishParams.file_path,
          fileType,
          nsfw       : publishParams.metadata.nsfw,
        };
        upsertCriteria = {
          name   : publishParams.name,
          claimId: publishResults.claim_id,
        };
        return Promise.all([db.upsert(db.File, fileRecord, upsertCriteria, 'File'), db.upsert(db.Claim, fileRecord, upsertCriteria, 'Claim')]);
      })
      .then(() => {
        logger.debug('File and Claim records successfully created');
        resolve(publishResults); // resolve the promise with the result from lbryApi.publishClaim;
      })
      .catch(error => {
        publishHelpers.deleteTemporaryFile(publishParams.file_path); // delete the local file
        reject(error);
      });
    });
  },
};
