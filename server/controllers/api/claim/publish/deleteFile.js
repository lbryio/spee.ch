import logger from 'winston';
import fs from 'fs';

const deleteFile = filePath => {
  fs.unlink(filePath, err => {
    if (err) {
      return logger.error(`error deleting temporary file ${filePath}`);
    }
    logger.info(`successfully deleted ${filePath}`);
  });
};

export default deleteFile;
