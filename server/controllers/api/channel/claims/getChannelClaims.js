const db = require('../../../../models');
const chainquery = require('chainquery');
const getClaimData = require('server/utils/getClaimData');
const { returnPaginatedChannelClaims } = require('./channelPagination.js');

const getChannelClaims = async (channelName, channelShortId, page) => {
  const channelId = await chainquery.claim.queries.getLongClaimId(channelName, channelShortId);
  const params = { content_type: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'video/mp4',
  ] };
  let channelClaims;
  if (channelId) {
    channelClaims = await chainquery.claim.queries.getAllChannelClaims(channelId, params);
  }

  const split = channelClaims.reduce(
    (acc, val) => val.dataValues.height === 0 ? { ...acc, zero: acc.zero.concat(val) } : { ...acc, nonzero: acc.nonzero.concat(val) },
    { zero: [], nonzero: [] }
  );
  channelClaims = split.zero.concat(split.nonzero);

  const processingChannelClaims = channelClaims ? channelClaims.map((claim) => getClaimData(claim)) : [];
  const processedChannelClaims = await Promise.all(processingChannelClaims);

  return returnPaginatedChannelClaims(channelName, channelId, processedChannelClaims, page);
};

module.exports = getChannelClaims;
