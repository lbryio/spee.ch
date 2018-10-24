const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const db = require('server/models');
const getClaimData = require('server/utils/getClaimData');

/*

  route to get all claims for special

*/

const channelClaims = async ({ ip, originalUrl, body, params }, res) => {
  const {
    name,
    page,
  } = params;

  if(name === 'trending') {
    const result = await db.Trending.getTrendingClaims();
    const claims = await Promise.all(result.map((claim) => getClaimData(claim)));
    return res.status(200).json({
      success: true,
      data: {
        channelName: name,
        claims,
        longChannelClaimId: name,
        currentPage: 1,
        nextPage: null,
        previousPage: null,
        totalPages: 1,
        totalResults: claims.length,
      }
    });
  }

  res.status(404).json({
    success: false,
    message: 'Feature endpoint not found',
  });
  handleErrorResponse(originalUrl, ip, 'Feature endpoint not found', res);
};

module.exports = channelClaims;
