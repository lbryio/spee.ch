const checkClaimAvailability = require('./checkClaimAvailability.js');
const { sendGATimingEvent } = require('../../../../utils/googleAnalytics.js');
const { handleErrorResponse } = require('../../../utils/errorHandlers.js');

/*

  route to check whether this site published to a claim

*/

const claimAvailability = ({ ip, originalUrl, params: { name } }, res) => {
  const gaStartTime = Date.now();
  checkClaimAvailability(name)
    .then(isAvailable => {
      let responseObject = {
        success: true,
        data: isAvailable,
      };
      if (isAvailable) {
        responseObject['message'] = `That claim name is available`
      } else {
        responseObject['message'] = `That name is already in use`
      }
      console.log('response object', responseObject);
      res.status(200).json(responseObject);
      sendGATimingEvent('end-to-end', 'claim name availability', name, gaStartTime, Date.now());
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimAvailability;
