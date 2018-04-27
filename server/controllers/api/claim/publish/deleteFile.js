const logger = require('winston');
const fs = require('fs');

const deleteFile = (filePath) => {
  fs.unlink(filePath, err => {
    if (err) {
      return logger.error(`error deleting temporary file ${filePath}`);
    }
    logger.debug(`successfully deleted ${filePath}`);
  });
};

module.exports = deleteFile;
