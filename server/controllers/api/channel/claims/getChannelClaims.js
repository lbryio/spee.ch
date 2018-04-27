const db = require('../../../../models');
const { returnPaginatedChannelClaims } = require('./channelPagination.js');
const NO_CHANNEL = 'NO_CHANNEL';

const getChannelClaims = (channelName, channelClaimId, page) => {
  return new Promise((resolve, reject) => {
    // 1. get the long channel Id (make sure channel exists)
    db.Certificate.getLongChannelId(channelName, channelClaimId)
      .then(longChannelClaimId => {
        if (!longChannelClaimId) {
          return [null, null, null];
        }
        // 2. get the short ID and all claims for that channel
        return Promise.all([longChannelClaimId, db.Claim.getAllChannelClaims(longChannelClaimId)]);
      })
      .then(([longChannelClaimId, channelClaimsArray]) => {
        if (!longChannelClaimId) {
          return resolve(NO_CHANNEL);
        }
        // 3. format the data for the view, including pagination
        let paginatedChannelViewData = returnPaginatedChannelClaims(channelName, longChannelClaimId, channelClaimsArray, page);
        // 4. return all the channel information and contents
        resolve(paginatedChannelViewData);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = getChannelClaims;
