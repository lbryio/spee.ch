const logger = require('winston');
const db = require('../../../../models');
const { publishClaim } = require('../../../../lbrynet');
const { createFileRecordDataAfterPublish } = require('../../../../models/utils/createFileRecordData.js');
const { createClaimRecordDataAfterPublish } = require('../../../../models/utils/createClaimRecordData.js');
const deleteFile = require('./deleteFile.js');

const publish = async (publishParams, fileName, fileType, filePath) => {
  let publishResults;
  let channel;
  let fileRecord;
  let newFile = Boolean(filePath);

  try {
    publishResults = await publishClaim(publishParams);
    logger.info(`Successfully published ${publishParams.name} ${fileName}`, publishResults);

    // get the channel information
    if (publishParams.channel_name) {
      logger.debug(`this claim was published in channel: ${publishParams.channel_name}`);
      channel = await db.Channel.findOne({
        where: {
          channelName: publishParams.channel_name,
        },
      });
    } else {
      channel = null;
    }
    const certificateId = channel ? channel.channelClaimId : null;
    const channelName = channel ? channel.channelName : null;

    const claimRecord = await createClaimRecordDataAfterPublish(certificateId, channelName, fileName, fileType, publishParams, publishResults);
    const {claimId} = claimRecord;
    const upsertCriteria = {name: publishParams.name, claimId};
    if (newFile) {
      fileRecord = await createFileRecordDataAfterPublish(fileName, fileType, publishParams, publishResults);
    } else {
      fileRecord = await db.File.findOne({where: {claimId}});
    }

    const [file, claim] = await Promise.all([
      db.upsert(db.File, fileRecord, upsertCriteria, 'File'),
      db.upsert(db.Claim, claimRecord, upsertCriteria, 'Claim'),
    ]);
    logger.info('File and Claim records successfully created');

    await Promise.all([
      file.setClaim(claim),
      claim.setFile(file),
    ]);
    logger.info('File and Claim records successfully associated');

    return claimRecord;
  } catch (err) {
    // parse daemon response when err is a string
    // this needs work
    logger.info('publish/publish err:', err);
    const error = typeof err === 'string' ? JSON.parse(err) : err;
    if (filePath) {
      await deleteFile(filePath);
    }
    const message = error.error && error.error.message ? error.error.message : 'Unknown publish error';
    return {
      error: true,
      message,
    };
  }
};

module.exports = publish;
