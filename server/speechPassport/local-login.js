const PassportLocalStrategy = require('passport-local').Strategy;
const logger = require('winston');
const db = require('models');

const returnUserAndChannelInfo = (userInstance) => {
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
};

module.exports = new PassportLocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, done) => {
    return db.User
      .findOne({
        where: {userName: username},
      })
      .then(user => {
        if (!user) {
          logger.debug('no user found');
          return done(null, false, {message: 'Incorrect username or password'});
        }
        return user.comparePassword(password)
          .then(isMatch => {
            if (!isMatch) {
              logger.debug('incorrect password');
              return done(null, false, {message: 'Incorrect username or password'});
            }
            logger.debug('Password was a match, returning User');
            return returnUserAndChannelInfo(user)
              .then(userInfo => {
                return done(null, userInfo);
              })
              .catch(error => {
                return error;
              });
          })
          .catch(error => {
            return error;
          });
      })
      .catch(error => {
        return done(error);
      });
  }
);
