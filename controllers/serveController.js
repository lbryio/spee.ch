const db = require('../models');
const logger = require('winston');

const DEFAULT_THUMBNAIL = 'https://spee.ch/assets/img/video_thumb_default.png';
const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';
const NO_FILE = 'NO_FILE';

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
  getChannelContents (channelName, channelClaimId) {
    return new Promise((resolve, reject) => {
      db.Certificate.getLongChannelId(channelName, channelClaimId)  // 1. get the long channel Id
        .then(longChannelClaimId => {  // 2. get all claims for that channel
          if (!longChannelClaimId) {
            return [null, null, null];
          }
          return Promise.all([longChannelClaimId, db.Certificate.getShortChannelIdFromLongChannelId(longChannelClaimId, channelName), db.Claim.getAllChannelClaims(longChannelClaimId)]);
        })
        .then(([longChannelClaimId, shortChannelClaimId, channelClaimsArray]) => {  // 4. add extra data not available from Claim table
          if (!longChannelClaimId) {
            return resolve(NO_CHANNEL);
          }
          if (channelClaimsArray) {
            channelClaimsArray.forEach(element => {
              const fileExtenstion = element.contentType.substring(element.contentType.lastIndexOf('/') + 1);
              element['showUrlLong'] = `/${channelName}:${longChannelClaimId}/${element.name}`;
              element['directUrlLong'] = `/${channelName}:${longChannelClaimId}/${element.name}.${fileExtenstion}`;
              element['showUrlShort'] = `/${channelName}:${shortChannelClaimId}/${element.name}`;
              element['directUrlShort'] = `/${channelName}:${shortChannelClaimId}/${element.name}.${fileExtenstion}`;
              element['thumbnail'] = module.exports.chooseThumbnail(element, DEFAULT_THUMBNAIL);
            });
          }
          resolve({
            channelName,
            longChannelClaimId,
            shortChannelClaimId,
            claims: channelClaimsArray,
          });
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
  getClaimRecord (claimId, name) {
    return db.Claim.findOne({where: {claimId, name}})
        .then(claim => {
          if (!claim) {
            throw new Error('no record found in Claim table');
          }
          claim.dataValues.thumbnail = module.exports.chooseThumbnail(claim.dataValues, DEFAULT_THUMBNAIL);
          claim.dataValues.fileExt = module.exports.determineFileExtensionFromContentType(claim.dataValues.contentType);
          return claim.dataValues;
        });
  },
  determineFileExtensionFromContentType (contentType) {
    switch (contentType) {
      case 'image/jpeg':
        return 'jpeg';
      case 'image/jpg':
        return 'jpg';
      case 'image/png':
        return 'png';
      case 'image/gif':
        return 'gif';
      case 'video/mp4':
        return 'mp4';
      default:
        logger.info('showing unknown file type as image/jpeg');
        return 'jpeg';
    }
  },
  chooseThumbnail (claimInfo, defaultThumbnail) {
    if (!claimInfo.thumbnail || claimInfo.thumbnail.trim() === '') {
      return defaultThumbnail;
    }
    return claimInfo.thumbnail;
  },
};
