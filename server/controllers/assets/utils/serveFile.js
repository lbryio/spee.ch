const logger = require('winston');

const serveFile = ({ filePath, fileType }, res) => {
  logger.verbose(`serving file: ${filePath}`);
  const sendFileOptions = {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Content-Type'          : fileType || 'image/jpeg',
    },
  };
  res.status(200).sendFile(filePath, sendFileOptions, (error) => {
    if (error) {
      logger.warn(filePath, error);
      res.status(404).send();
    }
  });
};

module.exports = serveFile;
