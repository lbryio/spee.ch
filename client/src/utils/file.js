import siteConfig from '@config/siteConfig.json';

const {
  publishing: {
    maxSizeImage = 10000000,
    maxSizeGif = 50000000,
    maxSizeVideo = 50000000,
  }
} = siteConfig;

module.exports = {
  validateFile (file) {
    if (!file) {
      throw new Error('no file provided');
    }
    if (/'/.test(file.name)) {
      throw new Error('apostrophes are not allowed in the file name');
    }
    // validate size and type
    switch (file.type) {
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
        if (file.size > maxSizeImage) {
          throw new Error(`Sorry, images are limited to ${maxSizeImage / SIZE_MB} megabytes.`);
        }
        break;
      case 'image/gif':
        if (file.size > maxSizeGif) {
          throw new Error(`Sorry, .gifs are limited to ${maxSizeGif / SIZE_MB} megabytes.`);
        }
        break;
      case 'video/mp4':
        if (file.size > maxSizeVideo) {
          throw new Error(`Sorry, videos are limited to ${maxSizeVideo / SIZE_MB} megabytes.`);
        }
        break;
      default:
        throw new Error(file.type + ' is not a supported file type. Only, .jpeg, .png, .gif, and .mp4 files are currently supported.');
    }
  },
};
