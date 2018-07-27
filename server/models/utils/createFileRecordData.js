const logger = require('winston');
const sizeOfImage = require('image-size');
const sizeOfVideo = require('get-video-dimensions');

async function getFileDimensions (fileType, filePath) {
  let height = 0;
  let width = 0;
  switch (fileType) {
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
    case 'image/gif':
      logger.debug('creating File data for an image');
      const imageDimensions = sizeOfImage(filePath);
      height = imageDimensions.height;
      width = imageDimensions.width;
      break;
    case 'video/mp4':
      logger.debug('creating File data for a video');
      const videoDimensions = await sizeOfVideo(filePath);
      logger.debug('video dimensions', videoDimensions);
      height = videoDimensions.height;
      width = videoDimensions.width;
      break;
    default:
      logger.error('unable to create File data for unspported file type:', fileType);
      break;
  }
  return {
    height,
    width,
  };
}

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
  } = await getFileDimensions(fileType, filePath);

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
  } = await getFileDimensions(fileType, filePath);

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
