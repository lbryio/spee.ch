const db = require('../models');
const PassportLocalStrategy = require('passport-local').Strategy;
const lbryApi = require('../helpers/lbryApi.js');
const logger = require('winston');

module.exports = new PassportLocalStrategy(
  {
    usernameField    : 'username',  // sets the custom name of parameters in the POST body message
    passwordField    : 'password',  // sets the custom name of parameters in the POST body message
    session          : false, // set to false because we will use token approach to auth
    passReqToCallback: true,  // we want to be able to read the post body message parameters in the callback
  },
  (req, username, password, done) => {
    console.log('inside local-signup');
    // create the channel and retrieve the metadata
    lbryApi.createChannel(username)
      .then(channelInfo => {
        // define an object that contains all the user data
        const userData = {
          channelName   : username,
          channelClaimId: channelInfo.claim_id,
          password      : password,
          email         : 'test email', // req.body.email.trim(),
        };
        return db.User.create(userData);
      })
      .then(user => {
        logger.debug('User record was created successfully');
        return done(null, user);  // user.datavalues?
      })
      .catch(error => {
        logger.debug(error);
        return done(error);
      });
  }
);
