const logger = require('winston');

const db = require('../../models/index');

const getClaimIdByChannel = (channelName, channelClaimId, claimName) => {
  logger.debug(`getClaimIdByChannel(${channelName}, ${channelClaimId}, ${claimName})`);
  return db.Certificate
    .getLongChannelId(channelName, channelClaimId)
    .then(longChannelId => {
      return db.Claim.getClaimIdByLongChannelId(longChannelId, claimName);
    });
};

const getClaimId = (channelName, channelClaimId, name, claimId) => {
  logger.debug(`getClaimId: ${channelName}, ${channelClaimId}, ${name}, ${claimId})`);
  if (channelName) {
    return getClaimIdByChannel(channelName, channelClaimId, name);
  } else {
    return db.Claim.getLongClaimId(name, claimId);
  }
};

module.exports = getClaimId;
