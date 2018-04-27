const logger = require('winston');

const SERVE = 'SERVE';
const SHOW = 'SHOW';

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
