const db = require('../../../../models');
const chainquery = require('chainquery');
const getClaimData = require('server/utils/getClaimData');
const { returnPaginatedChannelClaims } = require('./channelPagination.js');

const getChannelClaims = async (channelName, channelShortId, page) => {
  const channelId = await chainquery.claim.queries.getLongClaimId(channelName, channelShortId);
  const channelClaims = await chainquery.claim.queries.getAllChannelClaims(channelId);

  const processedChannelClaims = channelClaims.map((claim) => getClaimData(claim));

  return returnPaginatedChannelClaims(channelName, channelId, processedChannelClaims, page);
};

module.exports = getChannelClaims;
