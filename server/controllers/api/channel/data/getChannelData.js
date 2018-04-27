const db = require('../../../../models');
const NO_CHANNEL = 'NO_CHANNEL';

const getChannelData = (channelName, channelClaimId, page) => {
  return new Promise((resolve, reject) => {
    // 1. get the long channel Id (make sure channel exists)
    db.Certificate.getLongChannelId(channelName, channelClaimId)
      .then(longChannelClaimId => {
        if (!longChannelClaimId) {
          return [null, null, null];
        }
        // 2. get the short ID and all claims for that channel
        return Promise.all([longChannelClaimId, db.Certificate.getShortChannelIdFromLongChannelId(longChannelClaimId, channelName)]);
      })
      .then(([longChannelClaimId, shortChannelClaimId]) => {
        if (!longChannelClaimId) {
          return resolve(NO_CHANNEL);
        }
        // 3. return all the channel information
        resolve({
          channelName,
          longChannelClaimId,
          shortChannelClaimId,
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = getChannelData;
