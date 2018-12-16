const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const db = require('../../../../models');
const chainquery = require('chainquery').default;

/*

  route to get a short claim id from long claim Id

*/

const claimShortId = async ({ ip, originalUrl, body, params }, res) => {
  try {
    let shortId = await chainquery.claim.queries.getShortClaimIdFromLongClaimId(params.longId, params.name).catch(() => {});

    if (!shortId) {
      shortId = await db.Claim.getShortClaimIdFromLongClaimId(params.longId, params.name);
    }

    res.status(200).json({success: true, data: shortId});
  } catch (error) {
    handleErrorResponse(originalUrl, ip, error, res);
  }
};

module.exports = claimShortId;
