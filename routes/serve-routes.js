const logger = require('winston');
const { getClaimId, getLocalFileRecord } = require('../controllers/serveController.js');
const serveHelpers = require('../helpers/serveHelpers.js');
const { handleRequestError } = require('../helpers/errorHandlers.js');
const lbryUri = require('../helpers/lbryUri.js');

const SERVE = 'SERVE';
const SHOW = 'SHOW';
const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';
const NO_FILE = 'NO_FILE';

function isValidClaimId (claimId) {
  return ((claimId.length === 40) && !/[^A-Za-z0-9]/g.test(claimId));
}

function isValidShortId (claimId) {
  return claimId.length === 1;  // it should really evaluate the short url itself
}

function isValidShortIdOrClaimId (input) {
  return (isValidClaimId(input) || isValidShortId(input));
}

function clientAcceptsHtml ({accept}) {
  return accept && accept.match(/text\/html/);
}

function requestIsFromBrowser (headers) {
  return headers['user-agent'] && headers['user-agent'].match(/Mozilla/);
};

function clientWantsAsset ({accept, range}) {
  const imageIsWanted = accept && accept.match(/image\/.*/) && !accept.match(/text\/html/) && !accept.match(/text\/\*/);
  const videoIsWanted = accept && range;
  return imageIsWanted || videoIsWanted;
}

function determineResponseType (hasFileExtension, headers) {
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
}

function serveAssetToClient (claimId, name, res) {
  return getLocalFileRecord(claimId, name)
      .then(fileInfo => {
        // logger.debug('fileInfo:', fileInfo);
        if (fileInfo === NO_FILE) {
          return res.status(307).redirect(`/api/claim-get/${name}/${claimId}`);
        }
        return serveHelpers.serveFile(fileInfo, claimId, name, res);
      })
      .catch(error => {
        throw error;
      });
}

function flipClaimNameAndIdForBackwardsCompatibility (identifier, name) {
  // this is a patch for backwards compatability with '/name/claim_id' url format
  if (isValidShortIdOrClaimId(name) && !isValidShortIdOrClaimId(identifier)) {
    const tempName = name;
    name = identifier;
    identifier = tempName;
  }
  return [identifier, name];
}

function logRequestData (responseType, claimName, channelName, claimId) {
  logger.debug('responseType ===', responseType);
  logger.debug('claim name === ', claimName);
  logger.debug('channel name ===', channelName);
  logger.debug('claim id ===', claimId);
}

module.exports = (app) => {
  // route to serve a specific asset using the channel or claim id
  app.get('/:identifier/:claim', ({ headers, ip, originalUrl, params }, res) => {
    // decide if this is a show request
    let hasFileExtension;
    try {
      ({ hasFileExtension } = lbryUri.parseModifier(params.claim));
    } catch (error) {
      return res.status(200).json({success: false, message: error.message});
    }
    let responseType = determineResponseType(hasFileExtension, headers);
    if (responseType !== SERVE) {
      return res.status(200).render('index');
    }
    // parse the claim
    let claimName;
    try {
      ({ claimName } = lbryUri.parseClaim(params.claim));
    } catch (error) {
      return res.status(200).json({success: false, message: error.message});
    }
    // parse the identifier
    let isChannel, channelName, channelClaimId, claimId;
    try {
      ({ isChannel, channelName, channelClaimId, claimId } = lbryUri.parseIdentifier(params.identifier));
    } catch (error) {
      return handleRequestError(originalUrl, ip, error, res);
    }
    if (!isChannel) {
      [claimId, claimName] = flipClaimNameAndIdForBackwardsCompatibility(claimId, claimName);
    }
    // log the request data for debugging
    logRequestData(responseType, claimName, channelName, claimId);
    // get the claim Id and then serve the asset
    getClaimId(channelName, channelClaimId, claimName, claimId)
      .then(fullClaimId => {
        if (fullClaimId === NO_CLAIM) {
          return res.status(200).json({success: false, message: 'no claim id could be found'});
        } else if (fullClaimId === NO_CHANNEL) {
          return res.status(200).json({success: false, message: 'no channel id could be found'});
        }
        serveAssetToClient(fullClaimId, claimName, res);
        // postToStats(responseType, originalUrl, ip, claimName, fullClaimId, 'success');
      })
      .catch(error => {
        handleRequestError(originalUrl, ip, error, res);
        // postToStats(responseType, originalUrl, ip, claimName, fullClaimId, 'fail');
      });
  });
  // route to serve the winning asset at a claim or a channel page
  app.get('/:claim', ({ headers, ip, originalUrl, params, query }, res) => {
    // decide if this is a show request
    let hasFileExtension;
    try {
      ({ hasFileExtension } = lbryUri.parseModifier(params.claim));
    } catch (error) {
      return res.status(200).json({success: false, message: error.message});
    }
    let responseType = determineResponseType(hasFileExtension, headers);
    if (responseType !== SERVE) {
      return res.status(200).render('index');
    }
    // parse the claim
    let claimName;
    try {
      ({claimName} = lbryUri.parseClaim(params.claim));
    } catch (error) {
      return res.status(200).json({success: false, message: error.message});
    }
    // log the request data for debugging
    logRequestData(responseType, claimName, null, null);
    // get the claim Id and then serve the asset
    getClaimId(null, null, claimName, null)
      .then(fullClaimId => {
        if (fullClaimId === NO_CLAIM) {
          return res.status(200).render('index');
        }
        serveAssetToClient(fullClaimId, claimName, res);
        // postToStats(responseType, originalUrl, ip, claimName, fullClaimId, 'success');
      })
      .catch(error => {
        handleRequestError(originalUrl, ip, error, res);
        // postToStats(responseType, originalUrl, ip, claimName, fullClaimId, 'fail');
      });
  });
};
