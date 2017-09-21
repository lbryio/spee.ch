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
    // server-side validaton of raw inputs (username, password)

    // create the channel and retrieve the metadata
    return lbryApi.createChannel(username)
      .then(channelTx => {
        // create certificate record
        const certificateData = {
          address,
          claimId: channelTx.claim_id,
          name   : username,
        };
        logger.debug('certificateData >', certificateData);
        return db.Certificate.create(certificateData);
      })
      .then(certificate => {
        logger.debug('certificate result >', certificate.dataValues);
        logger.debug('Certificate record was created successfully');
          // define an object that contains all the user data
        const userData = {
          channelName   : username,
          channelClaimId: certificate.claimId,
          password      : password,
          address,
          CertificateId : certificate.id,
        };
        return db.User.create(userData);
      }).then(user => {
        logger.debug('User record was created successfully');
        return done(null, user);  // user.datavalues?
      })
      .catch(error => {
        logger.debug(error);
        return done(error);
      });
  }
);
