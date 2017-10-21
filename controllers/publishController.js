const logger = require('winston');
const db = require('../models');
const lbryApi = require('../helpers/lbryApi.js');
const publishHelpers = require('../helpers/publishHelpers.js');

module.exports = {
  publish (publishParams, fileName, fileType) {
    return new Promise((resolve, reject) => {
      let publishResults = {};
      // 1. publish the file
      return lbryApi.publishClaim(publishParams)
      // 2. upsert File record (update is in case the claim has been published before by this daemon)
      .then(tx => {
        logger.info(`Successfully published ${fileName}`, tx);
        publishResults = tx;
        return db.Channel.findOne({where: {channelName: publishParams.channel_name}});
      })
      .then(user => {
        let certificateId;
        if (user) {
          certificateId = user.channelClaimId;
          logger.debug('successfully found user in User table');
        } else {
          certificateId = null;
          logger.debug('user for publish not found in User table');
        };
        const fileRecord = {
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
        const claimRecord = {
          name       : publishParams.name,
          claimId    : publishResults.claim_id,
          title      : publishParams.metadata.title,
          description: publishParams.metadata.description,
          address    : publishParams.claim_address,
          outpoint   : `${publishResults.txid}:${publishResults.nout}`,
          height     : 0,
          contentType: fileType,
          nsfw       : publishParams.metadata.nsfw,
          certificateId,
          amount     : publishParams.bid,
        };
        const upsertCriteria = {
          name   : publishParams.name,
          claimId: publishResults.claim_id,
        };
        // create the records
        return Promise.all([db.upsert(db.File, fileRecord, upsertCriteria, 'File'), db.upsert(db.Claim, claimRecord, upsertCriteria, 'Claim')]);
      })
      .then(([file, claim]) => {
        logger.debug('File and Claim records successfully created');
        return Promise.all([file.setClaim(claim), claim.setFile(file)]);
      })
      .then(() => {
        logger.debug('File and Claim records successfully associated');
        resolve(publishResults); // resolve the promise with the result from lbryApi.publishClaim;
      })
      .catch(error => {
        logger.error('publishController.publish, error', error);
        publishHelpers.deleteTemporaryFile(publishParams.file_path); // delete the local file
        reject(error);
      });
    });
  },
};
