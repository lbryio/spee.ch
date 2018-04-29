const logger = require('winston');
const getLocalFileRecord = require('./getLocalFileRecord.js');
const NO_FILE = 'NO_FILE';

const serveAssetToClient = (claimId, name, res) => {
  return getLocalFileRecord(claimId, name)
    .then(fileRecord => {
      // check that a local record was found
      if (fileRecord === NO_FILE) {
        return res.status(307).redirect(`/api/claim/get/${name}/${claimId}`);
      }
      // serve the file
      const {filePath, fileType} = fileRecord;
      logger.verbose(`serving file: ${filePath}`);
      const sendFileOptions = {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'Content-Type'          : fileType || 'image/jpeg',
        },
      };
      res.status(200).sendFile(filePath, sendFileOptions);
    })
    .catch(error => {
      throw error;
    });
};

module.exports = serveAssetToClient;
