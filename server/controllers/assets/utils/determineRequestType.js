const logger = require('winston');
const { EMBED, SHOW } = require('../constants/request_types.js');

function clientWantsAsset ({accept, range}) {
  const imageIsWanted = accept && accept.match(/image\/.*/) && !accept.match(/text\/html/);
  const videoIsWanted = accept && accept.match(/video\/.*/) && !accept.match(/text\/html/);
  return imageIsWanted || videoIsWanted;
}

const determineRequestType = (hasFileExtension, headers) => {
  logger.info('determineRequestType', {
    hasFileExtension,
    headers,
  });
  if (hasFileExtension || clientWantsAsset(headers)) {
    return EMBED;
  }
  return SHOW;
};

module.exports = determineRequestType;
