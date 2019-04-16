import passport from 'passport';
import localLoginStrategy from './utils/local-login.js';
import localSignupStrategy from './utils/local-signup.js';
import serializeUser from './utils/serializeUser.js';
import deserializeUser from './utils/deserializeUser.js';

passport.deserializeUser(deserializeUser);
passport.serializeUser(serializeUser);
passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localSignupStrategy);

export default passport;
