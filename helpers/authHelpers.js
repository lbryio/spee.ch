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
  serializeSpeechUser (user, done) {  // returns user id to be serialized into session token
    logger.debug('serializing session');
    done(null, user.id);
  },
  deserializeSpeechUser (id, done) {  // deserializes session token and provides user from user id
    logger.debug('deserializing session');
    return db.User.findOne({ where: { id } })
    .then(user => {
      return module.exports.returnUserAndChannelInfo(user);
    })
    .then((userInfo) => {
      return done(null, userInfo);
    })
    .catch(error => {
      return done(error);
    });
  },
  returnUserAndChannelInfo (userInstance) {
    return new Promise((resolve, reject) => {
      let userInfo = {};
      userInfo['id'] = userInstance.id;
      userInfo['userName'] = userInstance.userName;
      userInstance
        .getChannel()
        .then(({channelName, channelClaimId}) => {
          userInfo['channelName'] = channelName;
          userInfo['channelClaimId'] = channelClaimId;
          return db.Certificate.getShortChannelIdFromLongChannelId(channelClaimId, channelName);
        })
        .then(shortChannelId => {
          userInfo['shortChannelId'] = shortChannelId;
          resolve(userInfo);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
