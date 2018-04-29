const db = require('../../../models');

const getClaimId = require('../../api/claim/longId/getClaimId.js');
const { handleErrorResponse } = require('../../utils/errorHandlers.js');

const serveAssetToClient = require('./serveAssetToClient.js');

const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';
const BLOCKED_CLAIM = 'BLOCKED_CLAIM';

const getClaimIdAndServeAsset = (channelName, channelClaimId, claimName, claimId, originalUrl, ip, res) => {
  getClaimId(channelName, channelClaimId, claimName, claimId)
    .then(fullClaimId => {
      claimId = fullClaimId;
      return db.Blocked.isNotBlocked(fullClaimId, claimName);
    })
    .then(() => {
      serveAssetToClient(claimId, claimName, res);
    })
    .catch(error => {
      if (error === NO_CLAIM) {
        return res.status(404).json({
          success: false,
          message: 'No claim id could be found',
        });
      }
      if (error === NO_CHANNEL) {
        return res.status(404).json({
          success: false,
          message: 'No channel id could be found',
        });
      }
      if (error === BLOCKED_CLAIM) {
        return res.status(410).json({
          success: false,
          message: 'In response to a complaint we received under the US Digital Millennium Copyright Act, we have blocked access to this content from our applications. For more details, see https://lbry.io/faq/dmca',
        });
      }
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = getClaimIdAndServeAsset;
