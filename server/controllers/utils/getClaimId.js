const logger = require('winston');

const db = require('../../models');
const chainquery = require('chainquery');

const getClaimIdByChannel = async (channelName, channelClaimId, claimName) => {
  logger.debug(`getClaimIdByChannel(${channelName}, ${channelClaimId}, ${claimName})`);

  let channelId = await chainquery.claim.queries.getLongClaimId(channelName, channelClaimId);

  if (channelId === null) {
    channelId = await db.Certificate.getLongChannelId(channelName, channelClaimId);
  }

  let claimId = await chainquery.claim.queries.getClaimIdByLongChannelId(channelId, claimName);

  if (claimId === null) {
    claimId = db.Claim.getClaimIdByLongChannelId(channelId, claimName);
  }

  return claimId;
};

const getClaimId = async (channelName, channelClaimId, name, claimId) => {
  logger.debug(`getClaimId: ${channelName}, ${channelClaimId}, ${name}, ${claimId})`);
  if (channelName) {
    return await getClaimIdByChannel(channelName, channelClaimId, name);
  } else {
    let claimIdResult = await chainquery.claim.queries.getLongClaimId(name, claimId);

    if (!claimIdResult) {
      claimIdResult = await db.Claim.getLongClaimId(name, claimId);
    }

    return claimIdResult;
  }
};

module.exports = getClaimId;
