const logger = require('winston');
const db = require('../../../../models');
const { publishClaim } = require('../../../../lbrynet');
const { createFileRecordDataAfterPublish } = require('../../../../models/utils/createFileRecordData.js');
const { createClaimRecordDataAfterPublish } = require('../../../../models/utils/createClaimRecordData.js');
const deleteFile = require('./deleteFile.js');

const publish = async (publishParams, fileName, fileType) => {
  let publishResults;
  let fileRecord;
  let filePath = publishParams.file_path;
  let newFile = Boolean(filePath);

  try {
    publishResults = await publishClaim(publishParams);
    logger.info(`Successfully published ${publishParams.name} ${fileName}`, publishResults);

    const certificateId = publishParams.channel_id || null;
    const channelName = publishParams.channel_name || null;

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
    logger.error('PUBLISH ERROR', err);
    await deleteFile(filePath);
    return err;
  }
};

module.exports = publish;
