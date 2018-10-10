const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const getClaimData = require('server/utils/getClaimData');
const chainquery = require('chainquery');
const db = require('../../../../models');

/*

  route to return data for a claim

*/

const claimData = async ({ ip, originalUrl, body, params }, res) => {
  const claimName = params.claimName;
  let claimId = params.claimId;
  if (claimId === 'none') claimId = null;

  try {
    let resolvedClaim = await chainquery.claim.queries.resolveClaim(claimName, claimId).catch(() => {});
    
    if(!resolvedClaim) {
      resolvedClaim = await db.Claim.resolveClaim(claimName, claimId);
    }

    if (!resolvedClaim) {
      return res.status(404).json({
        success: false,
        message: 'No claim could be found',
      });
    }

    res.status(200).json({
      success: true,
      data   : await getClaimData(resolvedClaim),
    });
  } catch(error) {
    handleErrorResponse(originalUrl, ip, error, res);
  }
};

module.exports = claimData;
