const { handleErrorResponse } = require('../utils/errorHandlers.js');
const db = require('../../models/index');

/*

  route to return data for a claim

*/

const claimData = ({ ip, originalUrl, body, params }, res) => {
  const claimName = params.claimName;
  let claimId = params.claimId;
  if (claimId === 'none') claimId = null;
  db.Claim.resolveClaim(claimName, claimId)
    .then(claimInfo => {
      if (!claimInfo) {
        return res.status(404).json({success: false, message: 'No claim could be found'});
      }
      res.status(200).json({success: true, data: claimInfo});
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimData;
