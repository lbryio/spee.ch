const logger = require('winston');
const { getClaimId, getChannelContents, getLocalFileRecord, getClaimRecord } = require('../controllers/serveController.js');
const serveHelpers = require('../helpers/serveHelpers.js');
const { handleRequestError } = require('../helpers/errorHandlers.js');
const db = require('../models');

const SERVE = 'SERVE';
const SHOW = 'SHOW';
const SHOWLITE = 'SHOWLITE';
const CLAIM_ID_CHAR = ':';
const CHANNEL_CHAR = '@';
const CLAIMS_PER_PAGE = 10;
const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';

function isValidClaimId (claimId) {
  return ((claimId.length === 40) && !/[^A-Za-z0-9]/g.test(claimId));
}

function isValidShortId (claimId) {
  return claimId.length === 1;  // it should really evaluate the short url itself
}

function isValidShortIdOrClaimId (input) {
  return (isValidClaimId(input) || isValidShortId(input));
}

function isUriAChannel (name) {
  return (name.charAt(0) === CHANNEL_CHAR);
}

function returnChannelNameFromUri (uri) {
  if (uri.indexOf(CLAIM_ID_CHAR) !== -1) {
    return uri.substring(0, uri.indexOf(CLAIM_ID_CHAR));
  }
  return uri;
}

function returnChannelIdFromUri (uri) {
  if (uri.indexOf(CLAIM_ID_CHAR) !== -1) {
    return uri.substring(uri.indexOf(CLAIM_ID_CHAR) + 1);
  }
  return null;
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
    layout        : 'channel',
    channelName   : result.channelName,
    longChannelId : result.longChannelId,
    shortChannelId: result.shortChannelId,
    claims        : extractPageFromClaims(result.claims, paginationPage),
    previousPage  : determinePreviousPage(paginationPage),
    currentPage   : paginationPage,
    nextPage      : determineNextPage(totalPages, paginationPage),
    totalPages    : totalPages,
    totalResults  : determineTotalClaims(result),
  };
  return options;
}

function sendChannelContentsToClient (result, query, res) {
  if (result === NO_CHANNEL) {              // (a) no channel found
    res.status(200).render('noChannel');
  } else {                                  // (b) channel found
    const options = returnOptionsForChannelPageRendering(result, query);
    res.status(200).render('channel', options);
  }
}

function showChannelPageToClient (uri, originalUrl, ip, query, res) {
  let channelName = returnChannelNameFromUri(uri);
  logger.debug('channel name =', channelName);
  let channelId = returnChannelIdFromUri(uri);
  logger.debug('channel Id =', channelId);
  // 1. retrieve the channel contents
  getChannelContents(channelName, channelId)
    .then(result => {
      sendChannelContentsToClient(result, query, res);
    })
    .catch(error => {
      handleRequestError('serve', originalUrl, ip, error, res);
    });
}

function determineResponseType (uri, headers) {
  let responseType;
  if (uri.indexOf('.') !== -1) {
    responseType = SERVE;
    if (headers['accept'] && headers['accept'].split(',').includes('text/html')) {
      responseType = SHOWLITE;
    }
  } else {
    responseType = SHOW;
  }
  return responseType;
}

function determineFileExtension (uri) {
  if (uri.indexOf('.') !== -1) {
    return uri.substring(uri.indexOf('.') + 1);
  }
  return null;
}

function determineName (uri) {
  /* patch because twitter player preview adds '>' before file extension.  Note: put this inside determineName()? */
  if (uri.indexOf('>') !== -1) {
    return uri.substring(0, uri.indexOf('>'));
  }
  /* end patch */
  if (uri.indexOf('.') !== -1) {
    return uri.substring(0, uri.indexOf('.'));
  }
  return uri;
}

function showAssetToClient (claimId, name, res) {
    // check for local file info, resolve the claim, and get the short
  return Promise
    .all([getClaimRecord(claimId, name), db.Claim.getShortClaimIdFromLongClaimId(claimId, name)])
    .then(([claimInfo, shortClaimId]) => {
      logger.debug('claimInfo:', claimInfo);
      logger.debug('shortClaimId:', shortClaimId);
      return serveHelpers.showFile(claimInfo, shortClaimId, res);
    })
    .catch(error => {
      throw error;
    });
}

function showPlainAssetToClient (claimId, name, res) {
  return Promise
        .all([getClaimRecord(claimId, name), db.Claim.getShortClaimIdFromLongClaimId(claimId, name)])
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
          if (fileInfo) {
            return serveHelpers.serveFile(fileInfo, res);
          } else {
            return res.status(307).json({status: 'success', message: 'resource temporarily unavailable'});
          }
        })
        .catch(error => {
          throw error;
        });
}

module.exports = (app) => {
  // route to serve a specific asset
  app.get('/:identifier/:name', ({ headers, ip, originalUrl, params }, res) => {
    let identifier = params.identifier;  // identifier will either be a @channel, @channel:channelId, or claimId
    let name = params.name;  // name will be example or example.ext
    let channelName = null;
    let claimId = null;
    let channelId = null;
    /* patch for backwards compatability with spee.ch/name/claim_id */
    if (isValidShortIdOrClaimId(name) && !isValidShortIdOrClaimId(identifier)) {
      let tempName = name;
      name = identifier;
      identifier = tempName;
    }
    /* end patch */
    let responseType = determineResponseType(name, headers);
    logger.debug('responseType ==', responseType);
    let fileExtension = determineFileExtension(name);
    logger.debug('file extension ==', fileExtension);
    let claimName = determineName(name);
    logger.debug('claim name == ', claimName);
    // parse identifier for whether it is a channel, short url, or claim_id
    if (isUriAChannel(identifier)) {
      channelName = returnChannelNameFromUri(identifier);
      channelId = returnChannelIdFromUri(identifier);
      logger.debug('channel name =', channelName);
    } else {
      claimId = identifier;
      logger.debug('claim id =', claimId);
    }
    // get the claim id
    getClaimId(channelName, channelId, name, claimId)
    .then(result => {
      logger.debug('getClaimId result:', result);
      if (result === NO_CLAIM) {
        res.status(200).render('noClaim');
        return;
      } else if (result === NO_CHANNEL) {
        res.status(200).render('noChannel');
        return;
      }
      // show, showlite, or serve
      switch (responseType) {
        case SERVE:
          return showAssetToClient(claimId, name, res);
        case SHOWLITE:
          return showPlainAssetToClient(claimId, name, res);
        case SHOW:
          return serveAssetToClient(claimId, name, res);
        default:
          break;
      }
    })
    // 3. update the file
    .then(fileInfoForUpdate => {
      // if needed, this is where we would update the file
    })
    .catch(error => {
      handleRequestError('serve', originalUrl, ip, error, res);
    });
  });
  // route to serve the winning asset at a claim
  app.get('/:uri', ({ headers, ip, originalUrl, params, query }, res) => {
    // parse name param
    let uri = params.uri;
    // (a) handle channel requests
    if (isUriAChannel(uri)) {
      showChannelPageToClient(uri, originalUrl, ip, query, res);
    // (b) handle stream requests
    } else {
      let responseType = determineResponseType(uri, headers);
      logger.debug('responseType ==', responseType);
      let fileExtension = determineFileExtension(uri);
      logger.debug('file extension ==', fileExtension);
      let name = determineName(uri);
      logger.debug('claim name == ', name);
      // get the claim id
      getClaimId(null, null, name, null)
        .then(claimId => {
          logger.debug('getClaimId result:', claimId);
          // if no claim id found, skip
          if (claimId === NO_CLAIM) {
            res.status(200).render('noClaim');
            return;
          }
          // show, showlite, or serve
          switch (responseType) {
            case SERVE:
              return showAssetToClient(claimId, name, res);
            case SHOWLITE:
              return showPlainAssetToClient(claimId, name, res);
            case SHOW:
              return serveAssetToClient(claimId, name, res);
            default:
              break;
          }
        })
        .then(fileInfoForUpdate => {
          // if needed, this is where we would update the file
        })
        .catch(error => {
          handleRequestError(responseType, originalUrl, ip, error, res);
        });
    }
  });
};
