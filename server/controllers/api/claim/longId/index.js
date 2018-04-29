const getClaimId = require('./getClaimId.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');

const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';

/*

  route to get a long claim id

*/

const claimLongId = ({ ip, originalUrl, body, params }, res) => {
  const channelName = body.channelName;
  const channelClaimId = body.channelClaimId;
  const claimName = body.claimName;
  const claimId = body.claimId;
  getClaimId(channelName, channelClaimId, claimName, claimId)
    .then(fullClaimId => {
      res.status(200).json({success: true, data: fullClaimId});
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
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimLongId;
