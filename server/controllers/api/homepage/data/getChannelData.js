import db from 'server/models';

const getChannelData = (channelName, channelClaimId) => {
  return new Promise((resolve, reject) => {
    let longChannelClaimId;
    // 1. get the long channel Id (make sure channel exists)
    db.Certificate.getLongChannelId(channelName, channelClaimId)
      .then(fullClaimId => {
        longChannelClaimId = fullClaimId;
        return db.Certificate.getShortChannelIdFromLongChannelId(fullClaimId, channelName);
      })
      .then(shortChannelClaimId => {
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

export default getChannelData;
