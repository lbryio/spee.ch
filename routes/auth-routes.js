const logger = require('winston');
const passport = require('passport');

module.exports = (app) => {
  // route for sign up
  app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    logger.verbose(`successful signup for ${req.user.channelName}`);
    res.status(200).json({
      success       : true,
      channelName   : req.user.channelName,
      channelClaimId: req.user.channelClaimId,
      shortChannelId: req.user.shortChannelId,
    });
  });
  // route for log in
  app.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      logger.debug('info:', info);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(200).json({
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
      res.status(200).json({success: false, message: 'user is not logged in'});
    }
  });
};
