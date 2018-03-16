const logger = require('winston');

module.exports = {
  serializeSpeechUser (user, done) {  // returns user data to be serialized into session
    logger.debug('serializing user');
    done(null, user);
  },
  deserializeSpeechUser (user, done) {  // deserializes session and populates additional info to req.user
    logger.debug('deserializing user');
    done(null, user);
  },
};
