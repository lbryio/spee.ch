const logger = require('winston');
const { getClaimId, getChannelContents, getLocalFileRecord, getClaimRecord } = require('../controllers/serveController.js');
const { serveOrShowAsset } = require('../helpers/serveHelpers.js');
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
  return claimId.length === 1;  // really it should evaluate the short url itself
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

function respondWithChannelPageToClient (uri, originalUrl, ip, query, res) {
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
  if (uri.indexOf('.') !== -1) {
    return uri.substring(0, uri.indexOf('.'));
  }
  return uri;
}

module.exports = (app) => {
  // route to serve a specific asset
  app.get('/:identifier/:name', ({ headers, ip, originalUrl, params }, res) => {
    let identifier = params.identifier;  // identifier will either be a channel or claim id
    let name = params.name;
    let channelName = null;
    let claimId = null;
    let channelId = null;
    let method;
    let fileExtension;
    // parse the name
    const positionOfExtension = name.indexOf('.');
    if (positionOfExtension >= 0) {
      fileExtension = name.substring(positionOfExtension + 1);
      name = name.substring(0, positionOfExtension);
      /* patch because twitter player preview adds '>' before file extension */
      if (name.indexOf('>') >= 0) {
        name = name.substring(0, name.indexOf('>'));
      }
      /* end patch */
      logger.debug('file extension =', fileExtension);
      if (headers['accept'] && headers['accept'].split(',').includes('text/html')) {
        method = SHOWLITE;
      } else {
        method = SERVE;
      }
    } else {
      method = SHOW;
    }
    /* patch for backwards compatability with spee.ch/name/claim_id */
    if (isValidShortIdOrClaimId(name) && !isValidShortIdOrClaimId(identifier)) {
      let tempName = name;
      name = identifier;
      identifier = tempName;
    }
    /* end patch */
    logger.debug('claim name =', name);
    logger.debug('method =', method);
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
      // check for local file info and resolve the claim
      return Promise.all([getLocalFileRecord(result, name), getClaimRecord(result, name), db.Claim.getShortClaimIdFromLongClaimId(result, name)]);
    })
    .then(([fileInfo, claimInfo, shortClaimId]) => {
      logger.debug(`file record:`, fileInfo);
      logger.debug('claim record:', claimInfo);
      logger.debug('short url:', shortClaimId);
      // serve or show
      return serveOrShowAsset(method, fileInfo, claimInfo, shortClaimId, res);
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
      respondWithChannelPageToClient(uri, originalUrl, ip, query, res);
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
        .then(result => {
          logger.debug('getClaimId result:', result);
          if (result === NO_CLAIM || result === NO_CHANNEL) {
            return result;
          }
          // check for local file info and resolve the claim
          return Promise.all([getLocalFileRecord(result, name), getClaimRecord(result, name), db.Claim.getShortClaimIdFromLongClaimId(result, name)]);
        })
        .then(result => {
          if (result === NO_CLAIM) {
            res.status(200).render('noClaim');
            return;
          } else if (result === NO_CHANNEL) {
            res.status(200).render('noChannel');
            return;
          }
          let fileInfo, claimInfo, shortClaimId;
          [fileInfo, claimInfo, shortClaimId] = result;
          logger.debug(`fileInfo:`, fileInfo);
          logger.debug('claimInfo:', claimInfo);
          logger.debug('shortClaimId:', shortClaimId);
          // serve or show
          return serveOrShowAsset(responseType, fileInfo, claimInfo, shortClaimId, res);
        })
        // 3. update the file
        .then(fileInfoForUpdate => {
            // if needed, this is where we would update the file
        })
        .catch(error => {
          handleRequestError('serve', originalUrl, ip, error, res);
        });
    }
  });
};
