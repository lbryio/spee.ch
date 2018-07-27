const imageMagick = require('imagemagick');
const sizeOf = require('image-size');

const getImageMetadata = (filePath) => {
  return new Promise((resolve, reject) => {
    imageMagick.readMetadata(filePath, (err, metadata) => {
      if (err) {
        reject(err);
      }
      resolve(metadata);
    });
  });
};

const getImageDetails = (filePath) => {
  return new Promise((resolve, reject) => {
    imageMagick.identify(filePath, (err, details) => {
      if (err) {
        reject(err);
      }
      resolve(details);
    });
  });
};

const getImageHeightAndWidth = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const { height, width } = sizeOf(filePath);
      resolve([height, width]);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getImageMetadata,
  getImageDetails,
  getImageHeightAndWidth,
};
