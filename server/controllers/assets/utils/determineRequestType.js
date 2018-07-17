const logger = require('winston');
const { EMBED, SHOW } = require('../constants/request_types.js');

function clientWantsAsset ({accept, range}) {
  const imageIsWanted = accept && accept.match(/image\/.*/) && !accept.match(/text\/html/) && !accept.match(/text\/\*/);
  const videoIsWanted = accept && range;
  return imageIsWanted || videoIsWanted;
}

const determineRequestType = (hasFileExtension, headers) => {
  logger.debug('hasFileExtension:', hasFileExtension);
  logger.debug('headers:', headers);
  if (hasFileExtension || clientWantsAsset(headers)) {
    logger.debug('client wants direct asset');
    return EMBED;
  }
  logger.debug('client wants show page');
  return SHOW;
};

module.exports = determineRequestType;
