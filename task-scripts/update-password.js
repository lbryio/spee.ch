// load dependencies
const logger = require('winston');
const db = require('../models'); // require our models for syncing
// configure logging
const config = require('../config/speechConfig.js');
const { logLevel } = config.logging;
require('../config/loggerConfig.js')(logger, logLevel);

const userName = process.argv[2];
logger.debug('user name:', userName);
const oldPassword = process.argv[3];
logger.debug('old password:', oldPassword);
const newPassword = process.argv[4];
logger.debug('new password:', newPassword);

db.sequelize.sync() // sync sequelize
  .then(() => {
    logger.info('finding user profile');
    return db.User.findOne({
      where: {
        userName: userName,
      },
    });
  })
  .then(user => {
    if (!user) {
      throw new Error('no user found');
    }
    return new Promise((resolve, reject) => {
      user.comparePassword(oldPassword, (passwordErr, isMatch) => {
        if (passwordErr) {
          return reject(passwordErr);
        }
        if (!isMatch) {
          return reject('Incorrect old password.');
        }
        logger.debug('Password was a match, updating password');
        return resolve(user.changePassword(newPassword));
      });
    });
  })
  .then(() => {
    logger.debug('Password successfully updated');
  })
  .catch((error) => {
    logger.error(error);
  });
