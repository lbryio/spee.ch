const db = require('server/models');
const chainquery = require('chainquery').default;

const getChannelData = async (channelName, channelClaimId) => {
  let longChannelClaimId = await chainquery.claim.queries.getLongClaimId(channelName, channelClaimId).catch(() => false);

  if (!longChannelClaimId) {
    // Allow an error to throw here if this fails
    longChannelClaimId = await db.Certificate.getLongChannelId(channelName, channelClaimId);
  }

  let shortChannelClaimId = await chainquery.claim.queries.getShortClaimIdFromLongClaimId(longChannelClaimId, channelName).catch(() => false);

  if (!shortChannelClaimId) {
    shortChannelClaimId = await db.Certificate.getShortChannelIdFromLongChannelId(longChannelClaimId, channelName);
  }

  return {
    channelName,
    longChannelClaimId,
    shortChannelClaimId,
  };
};

module.exports = getChannelData;
