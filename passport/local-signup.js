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
    logger.debug(`new channel signup request. user: ${username} pass: ${password} .`);
    let user;
    // server-side validaton of inputs (username, password)

    // create the channel and retrieve the metadata
    return lbryApi.createChannel(`@${username}`)
      .then(tx => {
        // create user record
        const userData = {
          userName: username,
          password: password,
        };
        logger.debug('userData >', userData);
        // create user record
        const channelData = {
          channelName   : `@${username}`,
          channelClaimId: tx.claim_id,
        };
        logger.debug('channelData >', channelData);
        // create certificate record
        const certificateData = {
          claimId: tx.claim_id,
          name   : `@${username}`,
          // address,
        };
        logger.debug('certificateData >', certificateData);
        // save user and certificate to db
        return Promise.all([db.User.create(userData), db.Channel.create(channelData), db.Certificate.create(certificateData)]);
      })
      .then(([newUser, newChannel, newCertificate]) => {
        user = newUser;
        logger.debug('user and certificate successfully created');
        logger.debug('user result >', newUser.dataValues);
        logger.debug('user result >', newChannel.dataValues);
        logger.debug('certificate result >', newCertificate.dataValues);
        // associate the instances
        return Promise.all([newCertificate.setChannel(newChannel), newChannel.setUser(newUser)]);
      }).then(() => {
        logger.debug('user and certificate successfully associated');
        return done(null, user);
      })
      .catch(error => {
        logger.error('signup error', error);
        return done(error);
      });
  }
);
