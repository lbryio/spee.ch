const { handleErrorResponse } = require('helpers/errorHandlers.js');

/*

  route to get a short claim id from long claim Id

*/

const claimShortId = (db) => {
  return ({ ip, originalUrl, body, params }, res) => {
    db.Claim.getShortClaimIdFromLongClaimId(params.longId, params.name)
      .then(shortId => {
        res.status(200).json({success: true, data: shortId});
      })
      .catch(error => {
        handleErrorResponse(originalUrl, ip, error, res);
      });
  };
};

module.exports = claimShortId;
