const db = require('../models');
const PassportLocalStrategy = require('passport-local').Strategy;
const lbryApi = require('../helpers/lbryApi.js');
const logger = require('winston');
const config = require('config');

module.exports = new PassportLocalStrategy(
  {
    usernameField    : 'username',  // sets the custom name of parameters in the POST body message
    passwordField    : 'password',  // sets the custom name of parameters in the POST body message
    session          : false, // set to false because we will use token approach to auth
    passReqToCallback: true,  // we want to be able to read the post body message parameters in the callback
  },
  (req, username, password, done) => {
    logger.debug('new channel signup request');
    const address = config.get('WalletConfig.LbryClaimAddress');
    let user;
    // server-side validaton of inputs (username, password)

    // create the channel and retrieve the metadata
    return lbryApi.createChannel(username, address)
      .then(tx => {
        // create user record
        const userData = {
          channelName   : username,
          channelClaimId: tx.claim_id,
          password      : password,
        };
        logger.debug('userData >', userData);
        // create certificate record
        const certificateData = {
          claimId: tx.claim_id,
          name   : username,
          // address,
        };
        logger.debug('certificateData >', certificateData);
        // save user and certificate to db
        return Promise.all([db.User.create(userData), db.Certificate.create(certificateData)]);
      })
      .then(([newUser, newCertificate]) => {
        user = newUser;  // save outside scope of this function
        logger.debug('user and certificate successfully created');
        logger.debug('user result >', newUser.dataValues);
        logger.debug('certificate result >', newCertificate.dataValues);
        // associate the instances
        return Promise.all([newCertificate.setUser(newUser), newUser.setCertificate(newCertificate)]);
      }).then(() => {
        logger.debug('user and certificate successfully associated');
        logger.debug('user ===', user.dataValues);
        return done(null, user);
      })
      .catch(error => {
        logger.debug(error);
        return done(error);
      });
  }
);
