const logger = require('winston');
const { getClaimId, getChannelInfoAndContent, getLocalFileRecord } = require('../controllers/serveController.js');
const serveHelpers = require('../helpers/serveHelpers.js');
const { handleRequestError } = require('../helpers/errorHandlers.js');
const db = require('../models');
const lbryuri = require('../helpers/lbryuri.js');

const SERVE = 'SERVE';
const SHOW = 'SHOW';
const SHOWLITE = 'SHOWLITE';
const CLAIMS_PER_PAGE = 10;
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

function getPage (query) {
  if (query.p) {
    return parseInt(query.p);
  }
  return 1;
}

function extractPageFromClaims (claims, pageNumber) {
  if (!claims) {
    return [];  // if no claims, return this default
  }
  logger.debug('claims is array?', Array.isArray(claims));
  logger.debug(`pageNumber ${pageNumber} is number?`, Number.isInteger(pageNumber));
  const claimStartIndex = (pageNumber - 1) * CLAIMS_PER_PAGE;
  const claimEndIndex = claimStartIndex + 10;
  const pageOfClaims = claims.slice(claimStartIndex, claimEndIndex);
  return pageOfClaims;
}

function determineTotalPages (claims) {
  if (!claims) {
    return 0;
  } else {
    const totalClaims = claims.length;
    if (totalClaims < CLAIMS_PER_PAGE) {
      return 1;
    }
    const fullPages = Math.floor(totalClaims / CLAIMS_PER_PAGE);
    const remainder = totalClaims % CLAIMS_PER_PAGE;
    if (remainder === 0) {
      return fullPages;
    }
    return fullPages + 1;
  }
}

function determinePreviousPage (currentPage) {
  if (currentPage === 1) {
    return null;
  }
  return currentPage - 1;
}

function determineNextPage (totalPages, currentPage) {
  if (currentPage === totalPages) {
    return null;
  }
  return currentPage + 1;
}

function determineTotalClaims (result) {
  if (!result.claims) {
    return 0;
  }
  return result.claims.length;
}

function returnOptionsForChannelPageRendering (result, query) {
  const totalPages = determineTotalPages(result.claims);
  const paginationPage = getPage(query);
  const options = {
    layout             : 'channel',
    channelName        : result.channelName,
    longChannelClaimId : result.longChannelClaimId,
    shortChannelClaimId: result.shortChannelClaimId,
    claims             : extractPageFromClaims(result.claims, paginationPage),
    previousPage       : determinePreviousPage(paginationPage),
    currentPage        : paginationPage,
    nextPage           : determineNextPage(totalPages, paginationPage),
    totalPages         : totalPages,
    totalResults       : determineTotalClaims(result),
  };
  return options;
}

function sendChannelInfoAndContentToClient (result, query, res) {
  if (result === NO_CHANNEL) {              // (a) no channel found
    res.status(200).render('noChannel');
  } else {                                  // (b) channel found
    const options = returnOptionsForChannelPageRendering(result, query);
    res.status(200).render('channel', options);
  }
}

function showChannelPageToClient (channelName, channelClaimId, originalUrl, ip, query, res) {
  // 1. retrieve the channel contents
  getChannelInfoAndContent(channelName, channelClaimId)
    .then(result => {
      sendChannelInfoAndContentToClient(result, query, res);
    })
    .catch(error => {
      handleRequestError(originalUrl, ip, error, res);
    });
}

function clientAcceptsHtml (headers) {
  return headers['accept'] && headers['accept'].split(',').includes('text/html');
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
    if (!clientAcceptsHtml(headers)) {  // this is in case someone embeds a show url
      responseType = SERVE;
    }
  }
  return responseType;
}

function showAssetToClient (claimId, name, res) {
  return Promise
      .all([db.Claim.resolveClaim(name, claimId), db.Claim.getShortClaimIdFromLongClaimId(claimId, name)])
      .then(([claimInfo, shortClaimId]) => {
        logger.debug('claimInfo:', claimInfo);
        logger.debug('shortClaimId:', shortClaimId);
        return serveHelpers.showFile(claimInfo, shortClaimId, res);
      })
      .catch(error => {
        throw error;
      });
}

function showLiteAssetToClient (claimId, name, res) {
  return Promise
      .all([db.Claim.resolveClaim(name, claimId), db.Claim.getShortClaimIdFromLongClaimId(claimId, name)])
      .then(([claimInfo, shortClaimId]) => {
        logger.debug('claimInfo:', claimInfo);
        logger.debug('shortClaimId:', shortClaimId);
        return serveHelpers.showFileLite(claimInfo, shortClaimId, res);
      })
      .catch(error => {
        throw error;
      });
}

function serveAssetToClient (claimId, name, res) {
  return getLocalFileRecord(claimId, name)
      .then(fileInfo => {
        logger.debug('fileInfo:', fileInfo);
        if (fileInfo === NO_FILE) {
          res.status(307).redirect(`/api/claim-get/${name}/${claimId}`);
        } else {
          return serveHelpers.serveFile(fileInfo, claimId, name, res);
        }
      })
      .catch(error => {
        throw error;
      });
}

function showOrServeAsset (responseType, claimId, claimName, res) {
  switch (responseType) {
    case SHOW:
      return showAssetToClient(claimId, claimName, res);
    case SHOWLITE:
      return showLiteAssetToClient(claimId, claimName, res);
    case SERVE:
      return serveAssetToClient(claimId, claimName, res);
    default:
      break;
  }
}

function flipClaimNameAndIdForBackwardsCompatibility (identifier, name) {
  // this is a patch for backwards compatability with 'spee.ch/name/claim_id' url format
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
      ({ isChannel, channelName, channelClaimId, claimId } = lbryuri.parseIdentifier(params.identifier));
      ({ claimName, isServeRequest } = lbryuri.parseName(params.name));
    } catch (error) {
      return handleRequestError(originalUrl, ip, error, res);
    }
    if (!isChannel) {
      [claimId, claimName] = flipClaimNameAndIdForBackwardsCompatibility(claimId, claimName);
    }
    let responseType = determineResponseType(isServeRequest, headers);
    // log the request data for debugging
    logRequestData(responseType, claimName, channelName, claimId);
    // get the claim Id and then serve/show the asset
    getClaimId(channelName, channelClaimId, claimName, claimId)
    .then(fullClaimId => {
      if (fullClaimId === NO_CLAIM) {
        return res.status(200).render('noClaim');
      } else if (fullClaimId === NO_CHANNEL) {
        return res.status(200).render('noChannel');
      }
      showOrServeAsset(responseType, fullClaimId, claimName, res);
    })
    .catch(error => {
      handleRequestError(originalUrl, ip, error, res);
    });
  });
  // route to serve the winning asset at a claim or a channel page
  app.get('/:identifier', ({ headers, ip, originalUrl, params, query }, res) => {
    let isChannel, channelName, channelClaimId;
    try {
      ({ isChannel, channelName, channelClaimId } = lbryuri.parseIdentifier(params.identifier));
    } catch (error) {
      return handleRequestError(originalUrl, ip, error, res);
    }
    if (isChannel) {
      // log the request data for debugging
      logRequestData(null, null, channelName, null);
      // handle showing the channel page
      showChannelPageToClient(channelName, channelClaimId, originalUrl, ip, query, res);
    } else {
      let claimName, isServeRequest;
      try {
        ({claimName, isServeRequest} = lbryuri.parseName(params.identifier));
      } catch (error) {
        return handleRequestError(originalUrl, ip, error, res);
      }
      let responseType = determineResponseType(isServeRequest, headers);
      // log the request data for debugging
      logRequestData(responseType, claimName, null, null);
      // get the claim Id and then serve/show the asset
      getClaimId(null, null, claimName, null)
        .then(fullClaimId => {
          if (fullClaimId === NO_CLAIM) {
            return res.status(200).render('noClaim');
          }
          showOrServeAsset(responseType, fullClaimId, claimName, res);
        })
        .catch(error => {
          handleRequestError(originalUrl, ip, error, res);
        });
    }
  });
};
