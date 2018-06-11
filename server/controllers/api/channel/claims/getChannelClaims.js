const logger = require('winston');

const db = require('../../../../models');
const { returnPaginatedChannelClaims } = require('./channelPagination.js');

const getChannelClaims = (channelName, channelClaimId, page) => {
  return new Promise((resolve, reject) => {
    let longChannelClaimId;
    // 1. get the long channel Id (make sure channel exists)
    db.Certificate
      .getLongChannelId(channelName, channelClaimId)
      .then(result => {
        longChannelClaimId = result;
        return db
          .Claim
          .getAllChannelClaims(longChannelClaimId);
      })
      .then(channelClaimsArray => {
        logger.debug('channel claim array:', channelClaimsArray);
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
