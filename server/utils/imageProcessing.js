const im = require('imagemagick');

const getImageMetadata = (filePath) => {
  return im.readMetadata(filePath, (err, metadata) => {
    if (err) throw err;
    return metadata;
  });
};

const getImageDetails = (filePath) => {
  return im.identify(filePath, (err, details) => {
    if (err) throw err;
    return details;
  });
};

const getImageHeightAndWidth = (filePath) => {
  return im.identify(filePath, (err, details) => {
    if (err) throw err;
    const { height, width } = details;
    return [height, width];
  });
};

module.exports = {
  getImageMetadata,
  getImageDetails,
  getImageHeightAndWidth,
};
