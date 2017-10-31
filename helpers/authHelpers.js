const db = require('../models'); // require our models for syncing
const logger = require('winston');

module.exports = {
  populateLocalsDotUser (req, res, next) {
    if (req.user) {
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
  serializeSpeechUser (user, done) {
    done(null, user.id);
  },
  deserializeSpeechUser (id, done) {
    let userInfo = {};
    db.User.findOne({ where: { id } })
    .then(user => {
      userInfo['id'] = user.id;
      userInfo['userName'] = user.userName;
      return user.getChannel();
    })
    .then(channel => {
      userInfo['channelName'] = channel.channelName;
      userInfo['channelClaimId'] = channel.channelClaimId;
      return db.Certificate.getShortChannelIdFromLongChannelId(channel.channelClaimId, channel.channelName);
    })
    .then(shortChannelId => {
      userInfo['shortChannelId'] = shortChannelId;
      // return done(null, userInfo);
      done(null, userInfo);
      return null;
    })
    .catch(error => {
      logger.error(error);
      done(error, null);
    });
  },
};
