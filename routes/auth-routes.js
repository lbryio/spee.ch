const logger = require('winston');
const passport = require('passport');

module.exports = (app) => {
  // route for sign up
  app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    logger.debug('successful signup');
    res.status(200).json(true);
  });
  // route for log in
  app.post('/login', passport.authenticate('local-login'), (req, res) => {
    logger.debug(req.user);
    logger.debug('successful login');
    res.status(200).json({
      success       : true,
      channelName   : req.user.channelName,
      channelClaimId: req.user.channelClaimId,
      shortChannelId: req.user.shortChannelId,
    });
  });
};
