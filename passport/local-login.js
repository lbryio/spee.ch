
const PassportLocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const logger = require('winston');

module.exports = new PassportLocalStrategy(
  {
    usernameField    : 'username',  // username key in the request body
    passwordField    : 'password',  // password key in the request body
    session          : false,
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    logger.debug(`verifying loggin attempt ${username} ${password}`);
    let userInfo = {};
    return db.User
        .findOne({where: {userName: username}})
        .then(user => {
          if (!user) {
            logger.debug('no user found');
            return done(null, false, {message: 'Incorrect username or password.'});
          }
          logger.debug('user found:', user.dataValues);
          logger.debug('...comparing password...');
          return user.comparePassword(password, (passwordErr, isMatch) => {
            if (passwordErr) {
              logger.error('passwordErr:', passwordErr);
              return done(passwordErr);
            }

            if (!isMatch) {
              logger.debug('incorrect password');
              return done(null, false, {message: 'Incorrect username or password.'});
            }
            logger.debug('...password was a match...');
            userInfo['id'] = user.id;
            userInfo['userName'] = user.userName;
              // get the User's channel info
            return user.getChannel()
                .then(channel => {
                  userInfo['channelName'] = channel.channelName;
                  userInfo['channelClaimId'] = channel.channelClaimId;
                  return db.getShortChannelIdFromLongChannelId(channel.channelClaimId, channel.channelName);
                })
                .then(shortChannelId => {
                  userInfo['shortChannelId'] = shortChannelId;
                  return done(null, userInfo);
                })
                .catch(error => {
                  throw error;
                });
          });
        })
        .catch(error => {
          return done(error);
        });
  }
);
