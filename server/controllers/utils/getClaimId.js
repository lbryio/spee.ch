const logger = require('winston');

const db = require('../../models');

const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';

const getClaimIdByClaim = (claimName, claimId) => {
  logger.debug(`getClaimIdByClaim(${claimName}, ${claimId})`);
  return new Promise((resolve, reject) => {
    db.Claim.getLongClaimId(claimName, claimId)
      .then(longClaimId => {
        if (!longClaimId) {
          resolve(NO_CLAIM);
        }
        resolve(longClaimId);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getClaimIdByChannel = (channelName, channelClaimId, claimName) => {
  logger.debug(`getClaimIdByChannel(${channelName}, ${channelClaimId}, ${claimName})`);
  return new Promise((resolve, reject) => {
    db.Certificate.getLongChannelId(channelName, channelClaimId) // 1. get the long channel id
      .then(longChannelId => {
        if (!longChannelId) {
          return [null, null];
        }
        return Promise.all([longChannelId, db.Claim.getClaimIdByLongChannelId(longChannelId, claimName)]);  // 2. get the long claim id
      })
      .then(([longChannelId, longClaimId]) => {
        if (!longChannelId) {
          return resolve(NO_CHANNEL);
        }
        if (!longClaimId) {
          return resolve(NO_CLAIM);
        }
        resolve(longClaimId);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getClaimId = (channelName, channelClaimId, name, claimId) => {
  if (channelName) {
    return getClaimIdByChannel(channelName, channelClaimId, name);
  } else {
    return getClaimIdByClaim(name, claimId);
  }
};

module.exports = getClaimId;
