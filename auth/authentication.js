const db = require('../models');
const logger = require('winston');

module.exports = {
  authenticateChannelCredentials (channelName, userPassword) {
    return new Promise((resolve, reject) => {
      if (!channelName) {
        resolve(true);
        return;
      }
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
            if (!user.validPassword(userPassword, user.password)) {
              logger.debug('incorrect password');
              resolve(false);
              return;
            }
            logger.debug('user found:', user.dataValues);
            resolve(true);
          })
          .catch(error => {
            logger.error(error);
            reject();
          });
    });
  },
};
