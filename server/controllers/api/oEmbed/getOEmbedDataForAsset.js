const logger = require('winston');
const db = require('../../../models');
const getClaimId = require('../../utils/getClaimId');

const {
  details: { host, title: siteTitle },
} = require('@config/siteConfig');

const getOEmbedDataForAsset = (channelName, channelClaimId, claimName, claimId) => {
  let fileData, claimData;
  let data = {
    version: '1.0',
    provider_name: siteTitle,
    provider_url: host,
    cache_age: 86400, // one day in seconds
  };

  return getClaimId(channelName, channelClaimId, claimName, claimId)
    .then(fullClaimId => {
      claimId = fullClaimId;
      return db.Claim.findOne({
        where: {
          name: claimName,
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
      const serveUrl = `${host}/${fileData.claimId}/${fileData.name}.${fileData.fileType.substring(
        fileData.fileType.indexOf('/') + 1
      )}`;
      // set the resource type
      if (fileData.fileType === 'video/mp4') {
        data['type'] = 'video';
        data['html'] = `<video width="100%" controls poster="${
          claimData.thumbnail
        }" src="${serveUrl}"/></video>`;
      } else {
        data['type'] = 'picture';
        data['url'] = serveUrl;
      }
      // get the data
      data['title'] = claimData.title;
      data['width'] = fileData.fileWidth || 600;
      data['height'] = fileData.fileHeight || 400;
      data['author_name'] = siteTitle;
      data['author_url'] = host;
    })
    .then(() => {
      return data;
    });
};

module.exports = getOEmbedDataForAsset;
