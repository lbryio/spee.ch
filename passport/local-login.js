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
    return db.User
        .findOne({where: {channelName: username}})
        .then(user => {
          logger.debug('user', user.dataValues);
          if (!user) {
            return done(null, false, {message: 'Incorrect username or password.'});
          }
          if (!user.validPassword(password, user.password)) {
            return done(null, false, {message: 'Incorrect username or password.'});
          }
          return done(null, user.dataValues);
        })
        .catch(error => {
          return done(error);
        });
  }
);
