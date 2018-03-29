const { claimNameIsAvailable } = require('../../controllers/publishController.js');
const { sendGATimingEvent } = require('../../helpers/googleAnalytics.js');
const { handleErrorResponse } = require('helpers/errorHandlers.js');

/*

  route to check whether this site published to a claim

*/

const claimAvailability = () => {
  return ({ ip, originalUrl, params: { name } }, res) => {
    const gaStartTime = Date.now();
    claimNameIsAvailable(name)
      .then(result => {
        res.status(200).json(result);
        sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
      })
      .catch(error => {
        handleErrorResponse(originalUrl, ip, error, res);
      });
  };
};

module.exports = claimAvailability;
