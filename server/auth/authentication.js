const db = require('../models/index');
const logger = require('winston');

module.exports = {
  authenticateUser (channelName, channelId, channelPassword, user) {
    // case: no channelName or channel Id are provided (anonymous), regardless of whether user token is provided
    if (!channelName && !channelId) {
      return {
        channelName   : null,
        channelClaimId: null,
      };
    }
    // case: channelName or channel Id are provided with user token
    if (user) {
      if (channelName && channelName !== user.channelName) {
        throw new Error('the provided channel name does not match user credentials');
      }
      if (channelId && channelId !== user.channelClaimId) {
        throw new Error('the provided channel id does not match user credentials');
      }
      return {
        channelName   : user.channelName,
        channelClaimId: user.channelClaimId,
      };
    }
    // case: channelName or channel Id are provided with password instead of user token
    if (!channelPassword) throw new Error('no channel password provided');
    return module.exports.authenticateChannelCredentials(channelName, channelId, channelPassword);
  },
  authenticateChannelCredentials (channelName, channelId, userPassword) {
    return new Promise((resolve, reject) => {
      // hoisted variables
      let channelData;
      // build the params for finding the channel
      let channelFindParams = {};
      if (channelName) channelFindParams['channelName'] = channelName;
      if (channelId) channelFindParams['channelClaimId'] = channelId;
      // find the channel
      db.Channel
        .findOne({
          where: channelFindParams,
        })
        .then(channel => {
          if (!channel) {
            logger.debug('no channel found');
            throw new Error('Authentication failed, you do not have access to that channel');
          }
          channelData = channel.get();
          logger.debug('channel data:', channelData);
          return db.User.findOne({
            where: { userName: channelData.channelName.substring(1) },
          });
        })
        .then(user => {
          if (!user) {
            logger.debug('no user found');
            throw new Error('Authentication failed, you do not have access to that channel');
          }
          return user.comparePassword(userPassword);
        })
        .then(isMatch => {
          if (!isMatch) {
            logger.debug('incorrect password');
            throw new Error('Authentication failed, you do not have access to that channel');
          }
          logger.debug('...password was a match...');
          resolve(channelData);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
