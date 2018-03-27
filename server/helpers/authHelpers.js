module.exports = {
  serializeSpeechUser (user, done) {  // returns user data to be serialized into session
    console.log('serializing user');
    done(null, user);
  },
  deserializeSpeechUser (user, done) {  // deserializes session and populates additional info to req.user
    console.log('deserializing user');
    done(null, user);
  },
};
