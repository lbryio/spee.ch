const logger = require('winston');

const db = require('../../models/index');

const getClaimIdByChannel = (channelName, channelClaimId, claimName) => {
  return new Promise((resolve, reject) => {
    db.Certificate
      .getLongChannelId(channelName, channelClaimId)
      .then(longChannelId => {
        return db.Claim.getClaimIdByLongChannelId(longChannelId, claimName);
      })
      .then(longClaimId => {
        resolve(longClaimId);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getClaimId = (channelName, channelClaimId, name, claimId) => {
  if (channelName) {
    logger.debug(`getClaimIdByChannel(${channelName}, ${channelClaimId}, ${name})`);
    return getClaimIdByChannel(channelName, channelClaimId, name);
  } else {
    logger.debug(`db.Claim.getLongClaimId(${name}, ${claimId})`);
    return db.Claim.getLongClaimId(name, claimId);
  }
};

module.exports = getClaimId;
