const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const getChannelData = require('./getChannelData.js');
const isApprovedChannel = require('../../../../../utils/isApprovedChannel');
const { publishing: { serveOnlyApproved, approvedChannels } } = require('@config/siteConfig');
const NO_CHANNEL = 'NO_CHANNEL';

/*

  route to get data for a channel

*/

const channelData = ({ ip, originalUrl, body, params }, res) => {
  const channelName = params.channelName;
  let channelClaimId = params.channelClaimId;
  if (channelClaimId === 'none') channelClaimId = null;

  const chanObj = {};
  if (channelName) chanObj.name = channelName;
  if (channelClaimId) chanObj[(channelClaimId.length === 40 ? 'longId' : 'shortId')] = channelClaimId;
  if (serveOnlyApproved && !isApprovedChannel(chanObj, approvedChannels)) {
    return res.status(404).json({
      success: false,
      message: 'This content is unavailable',
    });
  }

  getChannelData(channelName, channelClaimId)
    .then(data => {
      res.status(200).json({
        success: true,
        data,
      });
    })
    .catch(error => {
      if (error === NO_CHANNEL) {
        return res.status(404).json({
          success: false,
          message: 'No matching channel was found',
        });
      }
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = channelData;
