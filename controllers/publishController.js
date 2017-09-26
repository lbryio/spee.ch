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
          return new Error('That name is already in use by spee.ch.');
        }
      })
      // 3. upsert File record (update is in case the claim has been published before by this daemon)
      .then(tx => {
        logger.info(`Successfully published ${fileName}`, tx);
        publishResults = tx;
        return db.Channel.findOne({where: {channelName: publishParams.channel_name}});
      })
      .then(user => {
        logger.debug('found user', user.datavalues);
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
          name         : publishParams.name,
          claimId      : publishResults.claim_id,
          title        : publishParams.metadata.title,
          description  : publishParams.metadata.description,
          address      : publishParams.claim_address,
          outpoint     : `${publishResults.txid}:${publishResults.nout}`,
          height       : 0,
          contentType  : fileType,
          nsfw         : publishParams.metadata.nsfw,
          certificateId: user.channelClaimId,
          amount       : publishParams.bid,
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
        publishHelpers.deleteTemporaryFile(publishParams.file_path); // delete the local file
        reject(error);
      });
    });
  },
};
