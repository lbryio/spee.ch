// const db = require('../models'); // require our models for syncing
const logger = require('winston');

module.exports = {
  populateLocalsDotUser (req, res, next) {
    if (req.user) {
      logger.debug('populating res.locals.user');
      res.locals.user = {
        id            : req.user.id,
        userName      : req.user.userName,
        channelName   : req.user.channelName,
        channelClaimId: req.user.channelClaimId,
        shortChannelId: req.user.shortChannelId,
      };
    }
    next();
  },
  serializeSpeechUser (user, done) {  // returns user data to be serialized into session
    logger.debug('serializing user');
    done(null, user);
  },
  deserializeSpeechUser (user, done) {  // deserializes session and populates additional info to req.user
    logger.debug('deserializing user');
    done(null, user);
  },
};
