const getMediaDimensions = require('../../utils/getMediaDimensions.js');

async function createFileRecordDataAfterGet (resolveResult, getResult) {
  const {
    name,
    claimId,
    outpoint,
    contentType: fileType,
  } = resolveResult;

  const {
    file_name: fileName,
    download_path: filePath,
  } = getResult;

  const {
    height: fileHeight,
    width: fileWidth,
  } = await getMediaDimensions(fileType, filePath);

  return {
    name,
    claimId,
    outpoint,
    fileHeight,
    fileWidth,
    fileName,
    filePath,
    fileType,
  };
}

async function createFileRecordDataAfterPublish (fileName, fileType, publishParams, publishResults) {
  const {
    name,
    file_path: filePath,
  } = publishParams;

  const {
    claim_id: claimId,
    txid,
    nout,
  } = publishResults;

  const {
    height: fileHeight,
    width: fileWidth,
  } = await getMediaDimensions(fileType, filePath);

  return {
    name,
    claimId,
    outpoint: `${txid}:${nout}`,
    fileHeight,
    fileWidth,
    fileName,
    filePath,
    fileType,
  };
}

module.exports = {
  createFileRecordDataAfterGet,
  createFileRecordDataAfterPublish,
};
