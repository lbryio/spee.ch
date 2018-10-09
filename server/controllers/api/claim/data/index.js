const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const getClaimData = require('server/utils/getClaimData');
const chainquery = require('chainquery');
const db = require('../../../../models');

/*

  route to return data for a claim

*/

const claimData = ({ ip, originalUrl, body, params }, res) => {
  const claimName = params.claimName;
  let claimId = params.claimId;
  if (claimId === 'none') claimId = null;
  chainquery.claim.queries.resolveClaim(claimName, claimId).catch(() => {})
    .then(claimInfo => {
      if (!claimInfo) {
        // Not found remote, try local
        return db.Claim.resolveClaim(claimName, claimId)
      }
      return claimInfo
    })
    .then(claimInfo => {
      if (!claimInfo) {
        return res.status(404).json({
          success: false,
          message: 'No claim could be found',
        });
      }

      res.status(200).json({
        success: true,
        data   : getClaimData(claimInfo),
      });
    })
    .catch(error => {
      handleErrorResponse(originalUrl, ip, error, res);
    });
};

module.exports = claimData;
