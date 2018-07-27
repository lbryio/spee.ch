const logger = require('winston');
const { publishClaim } = require('../../../../lbrynet');
const db = require('../../../../models');
const { createFileRecordDataAfterPublish } = require('../../../../models/utils/createFileRecordData.js');
const { createClaimRecordDataAfterPublish } = require('../../../../models/utils/createClaimRecordData.js');
const deleteFile = require('./deleteFile.js');

const publish = (publishParams, fileName, fileType) => {
  return new Promise((resolve, reject) => {
    let publishResults, certificateId, channelName;
    // publish the file
    return publishClaim(publishParams)
      .then(tx => {
        logger.info(`Successfully published ${publishParams.name} ${fileName}`, tx);
        publishResults = tx;
        // get the channel information
        if (publishParams.channel_name) {
          logger.debug(`this claim was published in channel: ${publishParams.channel_name}`);
          return db.Channel.findOne({
            where: {
              channelName: publishParams.channel_name,
            },
          });
        } else {
          logger.debug('this claim was not published in a channel');
          return null;
        }
      })
      .then(channel => {
        // set channel information
        certificateId = null;
        channelName = null;
        if (channel) {
          certificateId = channel.channelClaimId;
          channelName = channel.channelName;
        }
        logger.debug(`certificateId: ${certificateId}`);
      })
      .then(() => {
        return Promise.all([
          createFileRecordDataAfterPublish(fileName, fileType, publishParams, publishResults),
          createClaimRecordDataAfterPublish(certificateId, channelName, fileName, fileType, publishParams, publishResults),
        ]);
      })
      .then(([fileRecord, claimRecord]) => {
        // upsert the records
        const {name, claim_id: claimId} = publishParams;
        const upsertCriteria = {
          name,
          claimId,
        };
        return Promise.all([
          db.upsert(db.File, fileRecord, upsertCriteria, 'File'),
          db.upsert(db.Claim, claimRecord, upsertCriteria, 'Claim'),
        ]);
      })
      .then(([file, claim]) => {
        logger.debug('File and Claim records successfully created');
        return Promise.all([
          file.setClaim(claim),
          claim.setFile(file),
        ]);
      })
      .then(() => {
        logger.debug('File and Claim records successfully associated');
        // resolve the promise with the result from lbryApi publishClaim;
        resolve(publishResults);
      })
      .catch(error => {
        logger.error('PUBLISH ERROR', error);
        deleteFile(publishParams.file_path); // delete the local file
        reject(error);
      });
  });
};

module.exports = publish;
