const logger = require('winston');
const { getClaimId, getLocalFileRecord } = require('../controllers/serveController.js');
const serveHelpers = require('../helpers/serveHelpers.js');
const { handleRequestError } = require('../helpers/errorHandlers.js');
const { postToStats } = require('../helpers/statsHelpers.js');
const db = require('../models');
const lbryUri = require('../helpers/lbryUri.js');

const SERVE = 'SERVE';
const SHOW = 'SHOW';
const SHOWLITE = 'SHOWLITE';
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

function determineResponseType (isServeRequest, headers) {
  let responseType;
  if (isServeRequest) {
    responseType = SERVE;
    if (clientAcceptsHtml(headers)) {  // this is in case a serve request comes from a browser
      responseType = SHOWLITE;
    }
  } else {
    responseType = SHOW;
    if (clientWantsAsset(headers) && requestIsFromBrowser(headers)) {  // this is in case someone embeds a show url
      logger.debug('Show request came from browser and wants an image/video; changing response to serve.');
      responseType = SERVE;
    }
  }
  return responseType;
}

// function showAssetToClient (claimId, name, res) {
//   return Promise
//       .all([db.Claim.resolveClaim(name, claimId), db.Claim.getShortClaimIdFromLongClaimId(claimId, name)])
//       .then(([claimInfo, shortClaimId]) => {
//         // logger.debug('claimInfo:', claimInfo);
//         // logger.debug('shortClaimId:', shortClaimId);
//         return serveHelpers.showFile(claimInfo, shortClaimId, res);
//       })
//       .catch(error => {
//         throw error;
//       });
// }
//
// function showLiteAssetToClient (claimId, name, res) {
//   return Promise
//       .all([db.Claim.resolveClaim(name, claimId), db.Claim.getShortClaimIdFromLongClaimId(claimId, name)])
//       .then(([claimInfo, shortClaimId]) => {
//         // logger.debug('claimInfo:', claimInfo);
//         // logger.debug('shortClaimId:', shortClaimId);
//         return serveHelpers.showFileLite(claimInfo, shortClaimId, res);
//       })
//       .catch(error => {
//         throw error;
//       });
// }

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
  app.get('/:identifier/:name', ({ headers, ip, originalUrl, params }, res) => {
    let isChannel, channelName, channelClaimId, claimId, claimName, isServeRequest;
    try {
      ({ isChannel, channelName, channelClaimId, claimId } = lbryUri.parseIdentifier(params.identifier));
      ({ claimName, isServeRequest } = lbryUri.parseName(params.name));
    } catch (error) {
      return handleRequestError(originalUrl, ip, error, res);
    }
    if (!isChannel) {
      [claimId, claimName] = flipClaimNameAndIdForBackwardsCompatibility(claimId, claimName);
    }
    let responseType = determineResponseType(isServeRequest, headers);
    // log the request data for debugging
    logRequestData(responseType, claimName, channelName, claimId);
    // if a serve request, serve, otherwise send the react app
    if (responseType === SERVE) {
      // get the claim Id and then serve/show the asset
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
    } else {
      res.status(200).render('index');
    }
  });
  // route to serve the winning asset at a claim or a channel page
  app.get('/:identifier', ({ headers, ip, originalUrl, params, query }, res) => {
    let isChannel, channelName, channelClaimId;
    try {
      ({ isChannel, channelName, channelClaimId } = lbryUri.parseIdentifier(params.identifier));
    } catch (error) {
      return handleRequestError(originalUrl, ip, error, res);
    }
    if (isChannel) {
      // log the request data for debugging
      logRequestData(null, null, channelName, null);
      // handle showing the channel page
      return res.status(200).render('index');
    } else {
      let claimName, isServeRequest;
      try {
        ({claimName, isServeRequest} = lbryUri.parseName(params.identifier));
      } catch (error) {
        return handleRequestError(originalUrl, ip, error, res);
      }
      let responseType = determineResponseType(isServeRequest, headers);
      // log the request data for debugging
      logRequestData(responseType, claimName, null, null);
      // if a serve request, serve, otherwise send the react app
      if (responseType === SERVE) {
        // get the claim Id and then serve/show the asset
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
      } else {
        res.status(200).render('index');
      }
    }
  });
};
