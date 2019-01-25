const db = require('../../../../models');
const chainquery = require('chainquery').default;
const getClaimData = require('server/utils/getClaimData');
const { returnPaginatedChannelClaims } = require('./channelPagination.js');

const getChannelClaims = async (channelName, channelLongId, page) => {
  const params = {
    content_type: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4'],
  };

  let channelShortId = await chainquery.claim.queries.getShortClaimIdFromLongClaimId(
    channelLongId,
    channelName
  );
  let channelClaims;
  if (channelLongId) {
    channelClaims = await chainquery.claim.queries.getAllChannelClaims(channelLongId, params);
  }
  /*
    Put mempool unconfirmed claims at the beginning
   */
  const split = channelClaims.reduce(
    (acc, val) =>
      val.dataValues.height === 0
        ? { ...acc, zero: acc.zero.concat(val) }
        : { ...acc, nonzero: acc.nonzero.concat(val) },
    { zero: [], nonzero: [] }
  );
  channelClaims = split.zero.concat(split.nonzero);

  const processingChannelClaims = channelClaims
    ? channelClaims.map(claim => getClaimData(claim, channelName, channelShortId))
    : [];
  const processedChannelClaims = await Promise.all(processingChannelClaims);

  return returnPaginatedChannelClaims(channelName, channelShortId, processedChannelClaims, page);
};

module.exports = getChannelClaims;
