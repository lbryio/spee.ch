const logger = require('winston');
const db = require('../../../models');
const getClaimId = require('../../utils/getClaimId');

const getOEmbedDataForAsset = (channelName, channelClaimId, claimName, claimId) => {
  let fileData, claimData;
  let data = {
    version      : 1.0,
    author_name  : 'Spee.ch',
    author_url   : 'https://spee.ch',
    provider_name: 'Spee.ch',
    provider_url : 'https://spee.ch',
    cache_age    : 86400, // one day in seconds
  };

  return getClaimId(channelName, channelClaimId, claimName, claimId)
    .then(fullClaimId => {
      claimId = fullClaimId;
      return db.Claim.findOne({
        where: {
          name   : claimName,
          claimId: fullClaimId,
        },
      });
    })
    .then(claimRecord => {
      claimData = claimRecord.dataValues;
      return db.Blocked.isNotBlocked(claimData.outpoint);
    })
    .then(() => {
      return db.File.findOne({
        where: {
          name: claimName,
          claimId,
        },
      });
    })
    .then(fileRecord => {
      fileData = fileRecord.dataValues;
      logger.debug('file data:', fileData);
      // set the resource type
      if (fileData.fileType === 'video/mp4') {
        data['type'] = 'video';
      } else {
        data['type'] = 'picture';
      }
      // get the data
      data['title'] = claimData.title;
      data['thumbnail_url'] = `https://dev1.spee.ch/${fileData.claimId}/${fileData.name}.${fileData.fileType.substring('/')}`;
      data['thumbnail_width'] = fileData.width || 600;
      data['thumbnail_height'] = fileData.height || 400;
    })
    .then(() => {
      return data;
    });
};

module.exports = getOEmbedDataForAsset;
