const logger = require('winston');
const sizeOf = require('image-size');

const getFileDimensions = (fileType, filePath) => {
  let height = 0;
  let width = 0;
  switch (fileType) {
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
    case 'image/gif':
      logger.debug('creating File data for an image');
      const dimensions = sizeOf(filePath);
      height = dimensions.height;
      width = dimensions.width;
      break;
    case 'video/mp4':
      logger.debug('creating File data for a video');
      break;
    default:
      logger.error('unable to create File data for unspported file type:', fileType);
      break;
  }
  return {
    height,
    width,
  };
};

const createFileRecordDataAfterGet = (resolveResult, getResult) => {
  const { name, claimId, outpoint, contentType: fileType } = resolveResult;
  const { file_name: fileName, download_path: filePath } = getResult;
  const { height: fileHeight, width: fileWidth } = getFileDimensions(fileType, filePath);
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
};

const createFileRecordDataAfterPublish = (fileName, fileType, publishParams, publishResults) => {
  const { name, claim_id: claimId, file_path: filePath } = publishParams;
  const { txid, nout } = publishResults;
  const { height: fileHeight, width: fileWidth } = getFileDimensions(fileType, filePath);

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
};

module.exports = {
  createFileRecordDataAfterGet,
  createFileRecordDataAfterPublish,
};
