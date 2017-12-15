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
  app.post('/login', passport.authenticate('local-login'), (req, res) => {
    // logger.debug('req.user:', req.user);  // req.user contains the authenticated user's info
    logger.debug('successful login');
    res.status(200).json({
      success       : true,
      channelName   : req.user.channelName,
      channelClaimId: req.user.channelClaimId,
      shortChannelId: req.user.shortChannelId,
    });
  });
};
