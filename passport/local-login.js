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
    logger.debug('verifying loggin attempt');
    username = `@${username}`;
    return db.User
        .findOne({where: {channelName: username}})
        .then(user => {
          if (!user) {
            return done(null, false, {message: 'Incorrect username or password.'});
          }
          if (!user.validPassword(password, user.password)) {
            return done(null, false, {message: 'Incorrect username or password.'});
          }
          logger.debug('user', user.dataValues);
          return done(null, user);
        })
        .catch(error => {
          return done(error);
        });
  }
);
