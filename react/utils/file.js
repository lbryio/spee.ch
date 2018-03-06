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
        if (file.size > 10000000) {
          throw new Error('Sorry, images are limited to 10 megabytes.');
        }
        break;
      case 'image/gif':
        if (file.size > 30000000) {
          throw new Error('Sorry, GIFs are limited to 30 megabytes.');
        }
        break;
      case 'video/mp4':
        if (file.size > 20000000) {
          throw new Error('Sorry, videos are limited to 20 megabytes.');
        }
        break;
      default:
        throw new Error(file.type + ' is not a supported file type. Only, .jpeg, .png, .gif, and .mp4 files are currently supported.');
    }
  },
};
