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
    let certificate;
    // server-side validaton of inputs (username, password)

    // create the channel and retrieve the metadata
    return lbryApi.createChannel(username)
      .then(channelTx => {
        // create user record
        const userData = {
          channelName   : username,
          channelClaimId: channelTx.claim_id,
          password      : password,
          address,
        };
        logger.debug('userData >', userData);
        // create certificate record
        const certificateData = {
          address,
          claimId: channelTx.claim_id,
          name   : username,
        };
        logger.debug('certificateData >', certificateData);
        // save user and certificate to db
        return Promise.all([db.User.create(userData), db.Certificate.create(certificateData)]);
      })
      .then(result => {
        user = result[0];
        certificate = result[1];
        logger.debug('user and certificate successfully created');
        logger.debug('user result >', user.dataValues);
        logger.debug('certificate result >', certificate.dataValues);
        // associate the instances
        return Promise.all([certificate.setUser(user), user.setCertificate(certificate)]);
      }).then(result => {
        logger.debug('user and certificate successfully associated');
        return done(null, user);
      })
      .catch(error => {
        logger.debug(error);
        return done(error);
      });
  }
);
