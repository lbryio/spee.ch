const speechPassport = require('speechPassport');

const login = (req, res, next) => {
  speechPassport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: info.message,
      });
    }
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
};

module.exports = login;
