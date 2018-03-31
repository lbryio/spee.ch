const { checkChannelAvailability } = require('controllers/publishController.js');
const { sendGATimingEvent } = require('helpers/googleAnalytics.js');
const { handleErrorResponse } = require('helpers/errorHandlers.js');

/*

  route to check whether site has published to a channel

*/

const channelAvailability = ({ ip, originalUrl, params: { name } }, res) => {
  const gaStartTime = Date.now();
  checkChannelAvailability(name)
    .then(availableName => {
      res.status(200).json(availableName);
      sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = channelAvailability;
