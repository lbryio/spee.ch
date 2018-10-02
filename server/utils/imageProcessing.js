const sizeOf = require('image-size');

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
  getImageHeightAndWidth,
};
