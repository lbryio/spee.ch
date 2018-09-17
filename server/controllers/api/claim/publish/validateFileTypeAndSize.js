const STL = require('../../../../../client/src/utils/stl.js');
const logger = require('winston');

const validateFileTypeAndSize = (file) => {
  // check file type and size
  switch (file.type) {
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
      if (file.size > 10000000) {
        logger.debug('publish > file validation > .jpeg/.jpg/.png was too big');
        throw new Error('Sorry, images are limited to 10 megabytes.');
      }
      break;
    case 'image/gif':
      if (file.size > 50000000) {
        logger.debug('publish > file validation > .gif was too big');
        throw new Error('Sorry, .gifs are limited to 50 megabytes.');
      }
      break;
    case 'video/mp4':
      if (file.size > 50000000) {
        logger.debug('publish > file validation > .mp4 was too big');
        throw new Error('Sorry, videos are limited to 50 megabytes.');
      }
      break;
    default:
      // Handle STL check (file.type is empty for STLs and file.type cannot be reassigned)
      file.isStl = false;
      return new Promise((resolve, reject) => {
        const loader = new FileReader();
        loader.onloadend = (e) => {
          const stl = new STL(e.target.result);
          if (stl.valid) {
            file.isStl = true; // this allows us to keep track of the type since file.type == ''
            resolve(file);
          }
          reject();
        };
        loader.readAsArrayBuffer(file);
      })
        .catch(() => {
          logger.debug('publish > file validation > unrecognized file type');
          throw new Error('The ' + file.type + ' content type is not supported.  Only, image/jpg, image/png, image/gif, and video/mp4 content types are currently supported.');
        });
  }
  return file;
};

module.exports = validateFileTypeAndSize;
