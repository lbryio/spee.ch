const db = require('./models');
const PassportLocalStrategy = require('passport-local').Strategy;
const lbryApi = require('../helpers/lbryApi.js');

module.exports = new PassportLocalStrategy(
  {
    usernameField    : 'email',  // sets the custom name of parameters in the POST body message
    passwordField    : 'password',  // sets the custom name of parameters in the POST body message
    session          : false, // set to false because we will use token approach to auth
    passReqToCallback: true,  // we want to be able to read the post body message parameters in the callback
  },
  (req, username, password, done) => {
    // create the channel and retrieve the metadata
    lbryApi.createChannel(username)
      .then(channelInfo => {
        // define an object that contains all the user data
        const userData = {
          channelName: username,
          channelId  : channelInfo.claim_Id,
          password   : password,
          email      : req.body.email.trim(),
        };
        return db.User.create(userData);
      })
      .then(user => {
        return done(null);
      })
      .catch(error => {
        return done(error);
      });
  },
);
