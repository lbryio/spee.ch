const { handleErrorResponse } = require('../../../utils/errorHandlers.js');
const logger = require('winston');
const db = require('../../../../models');
const { auth: { masterPassword } } = require('../../../../../config/siteConfig.js');

/*

  route to update a password

*/

const updateUserPassword = ({ ip, originalUrl, body }, res) => {
  let userRecord;
  const { userName, oldPassword, newPassword } = body;

  if (!masterPassword) {
    return res.status(400).json({
      success: false,
      message: 'no master password set in site config',
    });
  }

  if (!userName || !oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'body should include userName (channel name without the @), oldPassword, & newPassword',
    });
  }

  db.User.findOne({
    where: {
      userName,
    },
  })
  .then(user => {
    userRecord = user;
    if (!userRecord) {
      throw new Error('no user found');
    }
    if (oldPassword === masterPassword) {
      logger.debug('master password provided');
      return true;
    } else {
      logger.debug('old password provided');
      return userRecord.comparePassword(oldPassword);
    }
  })
  .then(isMatch => {
    if (!isMatch) {
      throw new Error('Incorrect old password.');
    }
    logger.debug('Password was a match, updating password');
    return userRecord.changePassword(newPassword);
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
