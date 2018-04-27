const { getChannelData } = require('../../../utils/serveHelpers.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');

const NO_CHANNEL = 'NO_CHANNEL';

/*

  route to get data for a channel

*/

const channelData = ({ ip, originalUrl, body, params }, res) => {
  const channelName = params.channelName;
  let channelClaimId = params.channelClaimId;
  if (channelClaimId === 'none') channelClaimId = null;
  getChannelData(channelName, channelClaimId, 0)
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

module.exports = channelData;
