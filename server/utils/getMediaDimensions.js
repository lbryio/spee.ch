const logger = require('winston');
const { getImageHeightAndWidth } = require('./imageProcessing');
const { getVideoHeightAndWidth } = require('./videoProcessing');

async function getMediaDimensions (fileType, filePath) {
  let height = 0;
  let width = 0;
  switch (fileType) {
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
    case 'image/gif':
      logger.debug('creating File data for an image');
      [ height, width ] = await getImageHeightAndWidth(filePath);
      break;
    case 'video/mp4':
      logger.debug('creating File data for a video');
      [ height, width ] = await getVideoHeightAndWidth(filePath);
      break;
    default:
      logger.error('unable to create File dimension data for unspported file type:', fileType);
      break;
  }
  return {
    height,
    width,
  };
}

module.exports = getMediaDimensions;
