const PassportLocalStrategy = require('passport-local').Strategy;
const db = require('./models');

module.exports = new PassportLocalStrategy(
  {
    usernameField    : 'username',  // username key in the request body
    passwordField    : 'password',  // password key in the request body
    session          : false,
    passReqToCallback: true,
  },
  (username, password, done) => {
    return db.User
        .findOne({where: {channelName: username}})
        .then(user => {
          if (!user) {
            return done(null, false, {message: 'Incorrect username or password.'});
          }
          if (!user.validPassword(password)) {
            return done(null, false, {message: 'Incorrect username or password.'});
          }
          return done(null, user);
        })
        .catch(error => {
          return done(error);
        });
  },
);
