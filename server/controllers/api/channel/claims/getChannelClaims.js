const db = require('../../../../models');
const chainquery = require('chainquery');
const getClaimData = require('server/utils/getClaimData');
const { returnPaginatedChannelClaims } = require('./channelPagination.js');

const getChannelClaims = async (channelName, channelShortId, page) => {
  const channelId = await chainquery.claim.queries.getLongClaimId(channelName, channelShortId);

  let channelClaims;
  if (channelId) {
    channelClaims = await chainquery.claim.queries.getAllChannelClaims(channelId);
  }

  const processingChannelClaims = channelClaims ? channelClaims.map((claim) => getClaimData(claim)) : [];
  const processedChannelClaims = await Promise.all(processingChannelClaims);

  return returnPaginatedChannelClaims(channelName, channelId, processedChannelClaims, page);
};

module.exports = getChannelClaims;
