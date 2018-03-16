const logger = require('winston');
const passport = require('passport');

module.exports = (app) => {
  // route for sign up
  app.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      logger.verbose(`successful signup for ${req.user.channelName}`);
      if (err) {
        console.log('err >> err:', err);
        return res.status(400).json({
          success: false,
          message: info.message,
        });
      }
      if (!user) {
        console.log('!user >> info:', info);
        return res.status(400).json({
          success: false,
          message: info.message,
        });
      }
      res.status(200).json({
        success       : true,
        channelName   : req.user.channelName,
        channelClaimId: req.user.channelClaimId,
        shortChannelId: req.user.shortChannelId,
      });
    })(req, res, next);
  });
  // route for log in
  app.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      logger.verbose('login info:', info);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({
          success: false,
          message: info.message,
        });
      }
      logger.debug('successful login');
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          success       : true,
          channelName   : req.user.channelName,
          channelClaimId: req.user.channelClaimId,
          shortChannelId: req.user.shortChannelId,
        });
      });
    })(req, res, next);
  });
  // route to log out
  app.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({success: true, message: 'you successfully logged out'});
  });
  // see if user is authenticated, and return credentials if so
  app.get('/user', (req, res) => {
    if (req.user) {
      res.status(200).json({success: true, data: req.user});
    } else {
      res.status(401).json({success: false, message: 'user is not logged in'});
    }
  });
};
