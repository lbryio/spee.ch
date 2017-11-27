const db = require('../models');
const logger = require('winston');

const DEFAULT_THUMBNAIL = 'https://spee.ch/assets/img/video_thumb_default.png';
const NO_CHANNEL = 'NO_CHANNEL';
const NO_FILE = 'NO_FILE';

module.exports = {
  getClaimId (channelName, channelId, name, claimId) {
    if (channelName) {
      return module.exports.getClaimIdByChannel(channelName, channelId, name);
    } else {
      return module.exports.getClaimIdByClaim(name, claimId);
    }
  },
  getClaimIdByClaim (claimName, claimId) {
    logger.debug(`getClaimIdByClaim(${claimName}, ${claimId})`);
    return new Promise((resolve, reject) => {
      db.Claim.getLongClaimId(claimName, claimId) // get the long claim id
        .then(result => {
          resolve(result);  // resolves with NO_CLAIM or valid claim id
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getClaimIdByChannel (channelName, channelId, claimName) {
    logger.debug(`getClaimIdByChannel(${channelName}, ${channelId}, ${claimName})`);
    return new Promise((resolve, reject) => {
      db.Certificate.getLongChannelId(channelName, channelId) // 1. get the long channel id
        .then(result => {
          if (result === NO_CHANNEL) {
            resolve(result);  // resolves NO_CHANNEL
            return;
          }
          return db.Claim.getClaimIdByLongChannelId(result, claimName);  // 2. get the long claim id
        })
        .then(result => {
          resolve(result);  // resolves with NO_CLAIM or valid claim id
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getChannelContents (channelName, channelId) {
    return new Promise((resolve, reject) => {
      let longChannelId;
      let shortChannelId;
      db.Certificate.getLongChannelId(channelName, channelId)  // 1. get the long channel Id
        .then(result => {  // 2. get all claims for that channel
          if (result === NO_CHANNEL) {
            return NO_CHANNEL;
          }
          longChannelId = result;
          return db.Certificate.getShortChannelIdFromLongChannelId(longChannelId, channelName);
        })
        .then(result => {  // 3. get all Claim records for this channel
          if (result === NO_CHANNEL) {
            return NO_CHANNEL;
          }
          shortChannelId = result;
          return db.Claim.getAllChannelClaims(longChannelId);
        })
        .then(result => {  // 4. add extra data not available from Claim table
          if (result === NO_CHANNEL) {
            resolve(result);
            return;
          }
          if (result) {
            result.forEach(element => {
              const fileExtenstion = element.contentType.substring(element.contentType.lastIndexOf('/') + 1);
              element['showUrlLong'] = `/${channelName}:${longChannelId}/${element.name}`;
              element['directUrlLong'] = `/${channelName}:${longChannelId}/${element.name}.${fileExtenstion}`;
              element['showUrlShort'] = `/${channelName}:${shortChannelId}/${element.name}`;
              element['directUrlShort'] = `/${channelName}:${shortChannelId}/${element.name}.${fileExtenstion}`;
              element['thumbnail'] = module.exports.chooseThumbnail(element, DEFAULT_THUMBNAIL);
            });
          }
          resolve({
            channelName,
            longChannelId,
            shortChannelId,
            claims: result,
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
          claim.dataValues.thumbnail = module.exports.chooseThumbnail(claim.dataValues.thumbnail, DEFAULT_THUMBNAIL);
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
