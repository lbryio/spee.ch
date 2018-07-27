const im = require('imagemagick');

const getImageMetadata = (filePath) => {
  return new Promise((resolve, reject) => {
    im.readMetadata(filePath, (err, metadata) => {
      if (err) {
        reject(err);
      }
      resolve(metadata);
    });
  });
};

const getImageDetails = (filePath) => {
  return new Promise((resolve, reject) => {
    im.identify(filePath, (err, details) => {
      if (err) {
        reject(err);
      }
      resolve(details);
    });
  });
};

const getImageHeightAndWidth = (filePath) => {
  return new Promise((resolve, reject) => {
    im.identify(filePath, (err, details) => {
      if (err) {
        reject(err);
      }
      const { height, width } = details;
      resolve([height, width]);
    });
  });
};

module.exports = {
  getImageMetadata,
  getImageDetails,
  getImageHeightAndWidth,
};
