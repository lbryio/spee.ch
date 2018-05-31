const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const logger = require('winston');
const db = require('../../../../models');
const siteConfig = require('./config/siteConfig.js');

const masterPassword = siteConfig.auth.sessionKey;

/*

  route to update a password

*/

const updateUserPassword = ({ ip, originalUrl, body }, res) => {
  let userRecord;
  const { userName, oldPassword, newPassword } = body;
  if (!user || !oldPassword || newPassword) {
    return res.status(400).json({success: false, message: 'body should include userName (channel name without the @), oldPassword, & newPassword'});
  };

  db.User.findOne({
    where: {
      userName,
    },
  })
  .then(user => {
    if (!user) {
      throw new Error('no user found');
    }
    userRecord = user;
    if (oldPassword === masterPassword) {
      console.log('master password provided');
      return true;
    } else {
      console.log('old password provided');
      return user.comparePassword(oldPassword);
    }
  })
  .then(isMatch => {
    if (!isMatch) {
      throw new Error('Incorrect old password.');
    }
    logger.debug('Password was a match, updating password');
    return user.changePassword(newPassword);
  })
  .then(() => {
    logger.debug('Password successfully updated');
    return res.status(200).json({
      success: true,
      message: 'Password successfully updated',
      oldPassword,
      newPassword,
    });
  })
  .catch((error) => {
    handleErrorResponse(originalUrl, ip, error, res);
  });
};

module.exports = updateUserPassword;
