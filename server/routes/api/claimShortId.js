const { handleErrorResponse } = require('../utils/errorHandlers.js');
const db = require('../../models');

/*

  route to get a short claim id from long claim Id

*/

const claimShortId = ({ ip, originalUrl, body, params }, res) => {
  db.Claim.getShortClaimIdFromLongClaimId(params.longId, params.name)
    .then(shortId => {
      res.status(200).json({success: true, data: shortId});
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimShortId;
