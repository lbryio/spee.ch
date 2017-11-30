
const PassportLocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const logger = require('winston');
const { returnUserAndChannelInfo } = require('../helpers/authHelpers.js');

module.exports = new PassportLocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    // session      : false,
  },
  (username, password, done) => {
    logger.debug('logging user in');
    return db
        .User
        .findOne({where: {userName: username}})
        .then(user => {
          if (!user) {
            // logger.debug('no user found');
            return done(null, false, {message: 'Incorrect username or password.'});
          }
          return user.comparePassword(password, (passwordErr, isMatch) => {
            if (passwordErr) {
              logger.error('passwordErr:', passwordErr);
              return done(null, false, {message: passwordErr});
            }
            if (!isMatch) {
              // logger.debug('incorrect password');
              return done(null, false, {message: 'Incorrect username or password.'});
            }
            logger.debug('Password was a match, returning User');
            return returnUserAndChannelInfo(user)
                .then((userInfo) => {
                  return done(null, userInfo);
                })
                .catch(error => {
                  return done(error);
                });
          });
        })
        .catch(error => {
          return done(error);
        });
  }
);
