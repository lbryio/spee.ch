const checkClaimAvailability = require('../utils/checkClaimAvailability.js');
const { sendGATimingEvent } = require('../../../../utils/googleAnalytics.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');

/*

  route to check whether this site published to a claim

*/

const claimAvailability = ({ ip, originalUrl, params: { name } }, res) => {
  const gaStartTime = Date.now();
  checkClaimAvailability(name)
    .then(result => {
      res.status(200).json(result);
      sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimAvailability;
