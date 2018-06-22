const logger = require('winston');

const SERVE = 'SERVE';
const SHOW = 'SHOW';

function headersMatchesSocialBotList (headers) {
  const socialBotList = [
    'facebookexternalhit',
    'Twitterbot',
  ];
  const userAgent = headers['user-agent'];
  for (let i = 0; i < socialBotList.length; i++) {
    const socialBot = socialBotList[i];
    if (userAgent.indexOf(socialBot) >= 0) {
      logger.debug('headers on request matched this bot:', socialBot);
      return true;
    }
  }
  return false;
}

function clientAcceptsHtml ({accept}) {
  return accept && accept.match(/text\/html/);
};

function requestIsFromBrowser (headers) {
  return headers['user-agent'] && headers['user-agent'].match(/Mozilla/);
};

function clientWantsAsset ({accept, range}) {
  const imageIsWanted = accept && accept.match(/image\/.*/) && !accept.match(/text\/html/) && !accept.match(/text\/\*/);
  const videoIsWanted = accept && range;
  return imageIsWanted || videoIsWanted;
};

const determineResponseType = (hasFileExtension, headers) => {
  let responseType;
  logger.debug('headers:', headers);
  // return early with 'show' if headers match the list
  if (headersMatchesSocialBotList(headers)) {
    // return SHOW;
  }
  // fallback logic if not on the list
  if (hasFileExtension) {
    responseType = SERVE;  // assume a serve request if file extension is present
    if (clientAcceptsHtml(headers)) {  // if the request comes from a browser, change it to a show request
      responseType = SHOW;
    }
  } else {
    responseType = SHOW;
    if (clientWantsAsset(headers) && requestIsFromBrowser(headers)) {  // this is in case someone embeds a show url
      logger.debug('Show request came from browser but wants an image/video. Changing response to serve...');
      responseType = SERVE;
    }
  }
  return responseType;
};

module.exports = determineResponseType;
