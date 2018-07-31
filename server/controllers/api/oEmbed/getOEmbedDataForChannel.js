const db = require('../../../models');

const {
  details: {
    host,
    title: siteTitle,
  },
} = require('@config/siteConfig');

const getOEmbedDataForChannel = (channelName, channelClaimId) => {
  return db.Certificate
    .findOne({
      where: {
        name   : channelName,
        claimId: channelClaimId,
      },
    })
    .then(certificateRecord => {
      const certificateData = certificateRecord.dataValues;
      return {
        version      : 1.0,
        provider_name: siteTitle,
        provider_url : host,
        type         : 'link',
        author_name  : certificateData.name,
        title        : `${certificateData.name}'s channel on Spee.ch`,
        author_url   : `${host}/${certificateData.name}:${certificateData.claimId}`,
        cache_age    : 86400, // one day in seconds
      };
    });
};

module.exports = getOEmbedDataForChannel;
