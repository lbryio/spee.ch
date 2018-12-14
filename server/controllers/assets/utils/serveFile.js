const logger = require('winston');

const serveFile = ({ filePath, fileType }, res) => {
  if (!fileType) {
    logger.error(`no fileType provided for ${filePath}`);
  }
  const sendFileOptions = {
    headers: {
      'X-Content-Type-Options'      : 'nosniff',
      'Content-Type'                : fileType,
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
  };
  logger.debug(`fileOptions for ${filePath}:`, sendFileOptions);
  res.status(200).sendFile(filePath, sendFileOptions);
};

module.exports = serveFile;
