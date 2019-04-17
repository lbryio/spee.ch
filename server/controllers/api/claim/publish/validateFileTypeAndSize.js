import logger from 'winston';

const {
  publishing: { maxSizeImage = 10000000, maxSizeGif = 50000000, maxSizeVideo = 50000000 },
} = require('@config/siteConfig');

const SIZE_MB = 1000000;

const validateFileTypeAndSize = file => {
  // check file type and size
  switch (file.type) {
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
    case 'image/svg+xml':
      if (file.size > maxSizeImage) {
        logger.debug('publish > file validation > .jpeg/.jpg/.png was too big');
        throw new Error(`Sorry, images are limited to ${maxSizeImage / SIZE_MB} megabytes.`);
      }
      break;
    case 'image/gif':
      if (file.size > maxSizeGif) {
        logger.debug('publish > file validation > .gif was too big');
        throw new Error(`Sorry, .gifs are limited to ${maxSizeGif / SIZE_MB} megabytes.`);
      }
      break;
    case 'video/mp4':
      if (file.size > maxSizeVideo) {
        logger.debug('publish > file validation > .mp4 was too big');
        throw new Error(`Sorry, videos are limited to ${maxSizeVideo / SIZE_MB} megabytes.`);
      }
      break;
    default:
      logger.debug('publish > file validation > unrecognized file type');
      throw new Error(
        'The ' +
          file.type +
          ' content type is not supported.  Only, image/jpg, image/png, image/gif, and video/mp4 content types are currently supported.'
      );
  }
  return file;
};

export default validateFileTypeAndSize;
