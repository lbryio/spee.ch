const logger = require('winston');
const db = require('../../../models');

const getOEmbedDataForChannel = (channelName, channelClaimId) => {
  logger.debug('get oembed for channel:', `${channelName}:${channelClaimId}`);
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
        provider_name: 'Spee.ch',
        provider_url : 'https://spee.ch',
        type         : 'link',
        author_name  : certificateData.name,
        title        : `${certificateData.name}'s channel on Spee.ch`,
        author_url   : `https://spee.ch/${certificateData.name}:${certificateData.claimId}`,
        cache_age    : 86400, // one day in seconds
      };
    });
};

module.exports = getOEmbedDataForChannel;
