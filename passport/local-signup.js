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
    logger.verbose(`new channel signup request. user: ${username} pass: ${password} .`);
    let userInfo = {};
    // server-side validaton of inputs (username, password)

    // create the channel and retrieve the metadata
    return lbryApi.createChannel(`@${username}`)
      .then(tx => {
        // create user record
        const userData = {
          userName: username,
          password: password,
        };
        logger.verbose('userData >', userData);
        // create user record
        const channelData = {
          channelName   : `@${username}`,
          channelClaimId: tx.claim_id,
        };
        logger.verbose('channelData >', channelData);
        // create certificate record
        const certificateData = {
          claimId: tx.claim_id,
          name   : `@${username}`,
          // address,
        };
        logger.verbose('certificateData >', certificateData);
        // save user and certificate to db
        return Promise.all([db.User.create(userData), db.Channel.create(channelData), db.Certificate.create(certificateData)]);
      })
      .then(([newUser, newChannel, newCertificate]) => {
        logger.verbose('user and certificate successfully created');
        logger.debug('user result >', newUser.dataValues);
        userInfo['id'] = newUser.id;
        userInfo['userName'] = newUser.userName;
        logger.verbose('channel result >', newChannel.dataValues);
        userInfo['channelName'] = newChannel.channelName;
        userInfo['channelClaimId'] = newChannel.channelClaimId;
        logger.verbose('certificate result >', newCertificate.dataValues);
        // associate the instances
        return Promise.all([newCertificate.setChannel(newChannel), newChannel.setUser(newUser)]);
      })
      .then(() => {
        logger.verbose('user and certificate successfully associated');
        return db.getShortChannelIdFromLongChannelId(userInfo.channelClaimId, userInfo.channelName);
      })
      .then(shortChannelId => {
        userInfo['shortChannelId'] = shortChannelId;
        return done(null, userInfo);
      })
      .catch(error => {
        logger.error('signup error', error);
        return done(error);
      });
  }
);
