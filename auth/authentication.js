const db = require('../models');
const logger = require('winston');

module.exports = {
  authenticateApiPublish (username, password) {
    return new Promise((resolve, reject) => {
      if (username === 'none') {
        resolve(true);
        return;
      }
      db.User
          .findOne({where: {userName: username}})
          .then(user => {
            if (!user) {
              logger.debug('no user found');
              resolve(false);
              return;
            }
            if (!user.validPassword(password, user.password)) {
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
