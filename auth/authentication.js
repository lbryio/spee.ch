const db = require('../models');
const logger = require('winston');

module.exports = {
  authenticateChannelCredentials (channelName, userPassword) {
    return new Promise((resolve, reject) => {
      const userName = channelName.substring(1);
      logger.debug(`authenticateChannelCredentials > channelName: ${channelName} username: ${userName} pass: ${userPassword}`);
      db.User
          .findOne({where: { userName }})
          .then(user => {
            if (!user) {
              logger.debug('no user found');
              resolve(false);
              return;
            }
            return user.comparePassword(userPassword, (passwordErr, isMatch) => {
              if (passwordErr) {
                logger.error('comparePassword error:', passwordErr);
                resolve(false);
                return;
              }
              if (!isMatch) {
                logger.debug('incorrect password');
                resolve(false);
                return;
              }
              logger.debug('...password was a match...');
              resolve(true);
            });
          })
          .catch(error => {
            reject(error);
          });
    });
  },
};
