const logger = require('winston');
const { EMBED, BROWSER, SOCIAL } = require('../constants/request_types.js');

function headersMatchesSocialBotList (headers) {
  const userAgent = headers['user-agent'];
  const socialBotList = [
    'facebookexternalhit',
    'Twitterbot',
  ];
  for (let i = 0; i < socialBotList.length; i++) {
    if (userAgent.indexOf(socialBotList[i]) >= 0) {
      logger.debug('request is from social bot:', socialBotList[i]);
      return true;
    }
  }
  return false;
}

function clientAcceptsHtml ({accept}) {
  return accept && accept.match(/text\/html/);
}

function requestIsFromBrowser (headers) {
  return headers['user-agent'] && headers['user-agent'].match(/Mozilla/);
}

function clientWantsAsset ({accept, range}) {
  const imageIsWanted = accept && accept.match(/image\/.*/) && !accept.match(/text\/html/) && !accept.match(/text\/\*/);
  const videoIsWanted = accept && range;
  return imageIsWanted || videoIsWanted;
}

const determineRequestType = (hasFileExtension, headers) => {
  let responseType;
  logger.debug('headers:', headers);
  // return early with 'show' if headers match the list
  if (headersMatchesSocialBotList(headers)) {
    return SOCIAL;
  }
  // if request is not from a social bot...
  if (hasFileExtension) {
    // assume embed,
    responseType = EMBED;
    // but change to browser if client accepts html.
    if (clientAcceptsHtml(headers)) {
      responseType = BROWSER;
    }
  // if request does not have file extentsion...
  } else {
    // assume browser,
    responseType = BROWSER;
    // but change to embed if someone embeded a show url...
    if (clientWantsAsset(headers) && requestIsFromBrowser(headers)) {
      responseType = EMBED;
    }
  }
  return responseType;
};

module.exports = determineRequestType;
