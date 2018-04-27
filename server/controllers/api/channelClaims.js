const { getChannelClaims } = require('../utils/serveHelpers.js');
const { handleErrorResponse } = require('../utils/errorHandlers.js');

const NO_CHANNEL = 'NO_CHANNEL';

/*

  route to get all claims for channel

*/

const channelClaims = ({ ip, originalUrl, body, params }, res) => {
  const channelName = params.channelName;
  let channelClaimId = params.channelClaimId;
  if (channelClaimId === 'none') channelClaimId = null;
  const page = params.page;
  getChannelClaims(channelName, channelClaimId, page)
    .then(data => {
      if (data === NO_CHANNEL) {
        return res.status(404).json({success: false, message: 'No matching channel was found'});
      }
      res.status(200).json({success: true, data});
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = channelClaims;
