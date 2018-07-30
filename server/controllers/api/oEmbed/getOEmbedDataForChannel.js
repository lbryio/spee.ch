const logger = require('winston');

const getOEmbedDataForChannel = (channelName, channelClaimId) => {
  logger.debug('get oembed for channel:', `${channelName}:${channelClaimId}`);
  return new Promise((resolve, reject) => {
    resolve({
      version      : 1.0,
      author_name  : 'Spee.ch',
      author_url   : 'https://spee.ch',
      provider_name: 'Spee.ch',
      provider_url : 'https://spee.ch',
      cache_age    : 86400, // one day in seconds
    });
  });
};

module.exports = getOEmbedDataForChannel;
