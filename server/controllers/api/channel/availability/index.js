const checkChannelAvailability = require('./checkChannelAvailability.js');
const { sendGATimingEvent } = require('../../../../utils/googleAnalytics.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');

/*

  route to check whether site has published to a channel

*/

const channelAvailability = ({ ip, originalUrl, params: { name } }, res) => {
  const gaStartTime = Date.now();
  checkChannelAvailability(name)
    .then(isAvailable => {
      let responseObject = {
        success: true,
        data: isAvailable,
      };
      if (isAvailable) {
        responseObject['message'] = `That channel name is available`
      } else {
        responseObject['message'] = `That channel is already in use`
      }
      res.status(200).json(responseObject);
      sendGATimingEvent('end-to-end', 'channel name availability', name, gaStartTime, Date.now());
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = channelAvailability;
