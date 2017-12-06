const db = require('../models');
const logger = require('winston');

const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';
const NO_FILE = 'NO_FILE';

function addUrlInformation (claim, channelName, longChannelClaimId, shortChannelClaimId, name, fileExtension) {
  claim['showUrlLong'] = `/${channelName}:${longChannelClaimId}/${name}`;
  claim['directUrlLong'] = `/${channelName}:${longChannelClaimId}/${name}.${fileExtension}`;
  claim['showUrlShort'] = `/${channelName}:${shortChannelClaimId}/${name}`;
  claim['directUrlShort'] = `/${channelName}:${shortChannelClaimId}/${name}.${fileExtension}`;
  return claim;
}

module.exports = {
  getClaimId (channelName, channelClaimId, name, claimId) {
    if (channelName) {
      return module.exports.getClaimIdByChannel(channelName, channelClaimId, name);
    } else {
      return module.exports.getClaimIdByClaim(name, claimId);
    }
  },
  getClaimIdByClaim (claimName, claimId) {
    logger.debug(`getClaimIdByClaim(${claimName}, ${claimId})`);
    return new Promise((resolve, reject) => {
      db.Claim.getLongClaimId(claimName, claimId)
        .then(longClaimId => {
          if (!longClaimId) {
            resolve(NO_CLAIM);
          }
          resolve(longClaimId);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getClaimIdByChannel (channelName, channelClaimId, claimName) {
    logger.debug(`getClaimIdByChannel(${channelName}, ${channelClaimId}, ${claimName})`);
    return new Promise((resolve, reject) => {
      db.Certificate.getLongChannelId(channelName, channelClaimId) // 1. get the long channel id
        .then(longChannelId => {
          if (!longChannelId) {
            return [null, null];
          }
          return Promise.all([longChannelId, db.Claim.getClaimIdByLongChannelId(longChannelId, claimName)]);  // 2. get the long claim id
        })
        .then(([longChannelId, longClaimId]) => {
          if (!longChannelId) {
            return resolve(NO_CHANNEL);
          }
          if (!longClaimId) {
            return resolve(NO_CLAIM);
          }
          resolve(longClaimId);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getChannelInfoAndContent (channelName, channelClaimId) { // note: move down to model layer?
    return new Promise((resolve, reject) => {
      // 1. get the long channel Id (make sure channel exists)
      db.Certificate.getLongChannelId(channelName, channelClaimId)
        .then(longChannelClaimId => {
          if (!longChannelClaimId) {
            return [null, null, null];
          }
          // 2. get the short ID and all claims for that channel
          return Promise.all([longChannelClaimId, db.Certificate.getShortChannelIdFromLongChannelId(longChannelClaimId, channelName), db.Claim.getAllChannelClaims(longChannelClaimId)]);
        })
        .then(([longChannelClaimId, shortChannelClaimId, channelClaimsArray]) => {
          if (!longChannelClaimId) {
            return resolve(NO_CHANNEL);
          }
          // 3. add url information to each claim
          if (channelClaimsArray) {
            channelClaimsArray.forEach(claim => {
              return addUrlInformation(claim);
            });
          }
          // 4. return all the channel information and contents
          resolve({ channelName, longChannelClaimId, shortChannelClaimId, claims: channelClaimsArray });
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getLocalFileRecord (claimId, name) {
    return db.File.findOne({where: {claimId, name}})
      .then(file => {
        if (!file) {
          return NO_FILE;
        }
        return file.dataValues;
      });
  },
};
