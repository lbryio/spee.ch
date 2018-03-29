const passport = require('passport');
const localLoginStrategy = require('./local-login.js');
const localSignupStrategy = require('./local-signup.js');
const { serializeSpeechUser, deserializeSpeechUser } = require('helpers/authHelpers.js');

passport.deserializeUser(deserializeSpeechUser);
passport.serializeUser(serializeSpeechUser);
passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localSignupStrategy);

module.exports = passport;
