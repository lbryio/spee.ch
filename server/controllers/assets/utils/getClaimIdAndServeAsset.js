const logger = require('winston');
const getClaimId = require('../../utils/getClaimId.js');
const getLocalFileRecord = require('../../utils/getLocalFileRecord.js');
const { handleErrorResponse } = require('../../utils/errorHandlers.js');

const NO_FILE = 'NO_FILE';
const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';

function serveAssetToClient (claimId, name, res) {
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

const getClaimIdAndServeAsset = (channelName, channelClaimId, claimName, claimId, originalUrl, ip, res) => {
  // get the claim Id and then serve the asset
  getClaimId(channelName, channelClaimId, claimName, claimId)
    .then(fullClaimId => {
      if (fullClaimId === NO_CLAIM) {
        return res.status(404).json({success: false, message: 'no claim id could be found'});
      } else if (fullClaimId === NO_CHANNEL) {
        return res.status(404).json({success: false, message: 'no channel id could be found'});
      }
      serveAssetToClient(fullClaimId, claimName, res);
      // postToStats(responseType, originalUrl, ip, claimName, fullClaimId, 'success');
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
      // postToStats(responseType, originalUrl, ip, claimName, fullClaimId, 'fail');
    });
};

module.exports = getClaimIdAndServeAsset;
