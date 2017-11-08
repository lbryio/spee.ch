const logger = require('winston');
const { getAssetByClaim, getChannelContents, getAssetByChannel, serveOrShowAsset } = require('../controllers/serveController.js');
const { handleRequestError } = require('../helpers/errorHandlers.js');

const SERVE = 'SERVE';
const SHOW = 'SHOW';
const SHOWLITE = 'SHOWLITE';
const CHANNEL = 'CHANNEL';
const CLAIM = 'CLAIM';
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

function getAsset (claimType, channelName, channelId, name, claimId) {
  switch (claimType) {
    case CHANNEL:
      return getAssetByChannel(channelName, channelId, name);
    case CLAIM:
      return getAssetByClaim(name, claimId);
    default:
      return new Error('that claim type was not found');
  }
}

function getPage (query) {
  if (query.p) {
    return parseInt(query.p);
  }
  return 1;
}

function extractPageFromClaims (claims, pageNumber) {
  logger.debug('claims is array?', Array.isArray(claims));
  logger.debug(`pageNumber ${pageNumber} is number?`, Number.isInteger(pageNumber));
  const claimStartIndex = (pageNumber - 1) * CLAIMS_PER_PAGE;
  const claimEndIndex = claimStartIndex + 10;
  const pageOfClaims = claims.slice(claimStartIndex, claimEndIndex);
  logger.debug('page of claims:', pageOfClaims);
  return pageOfClaims;
}

function determineTotalPages (totalClaims) {
  if (totalClaims === 0) {
    return 0;
  }
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

module.exports = (app) => {
  // route to serve a specific asset
  app.get('/:identifier/:name', ({ headers, ip, originalUrl, params }, res) => {
    let identifier = params.identifier;
    let name = params.name;
    let claimOrChannel;
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
    if (identifier.charAt(0) === '@') {
      channelName = identifier;
      claimOrChannel = CHANNEL;
      const channelIdIndex = channelName.indexOf(CLAIM_ID_CHAR);
      if (channelIdIndex !== -1) {
        channelId = channelName.substring(channelIdIndex + 1);
        channelName = channelName.substring(0, channelIdIndex);
      }
      logger.debug('channel name =', channelName);
    } else {
      claimId = identifier;
      logger.debug('claim id =', claimId);
      claimOrChannel = CLAIM;
    }
    // 1. retrieve the asset and information
    getAsset(claimOrChannel, channelName, channelId, name, claimId)
    // 2. serve or show
    .then(result => {
      logger.debug('getAsset result:', result);
      if (result === NO_CLAIM) {
        res.status(200).render('noClaim');
        return;
      } else if (result === NO_CHANNEL) {
        res.status(200).render('noChannel');
        return;
      }
      return serveOrShowAsset(result, fileExtension, method, headers, originalUrl, ip, res);
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
  app.get('/:name', ({ headers, ip, originalUrl, params, query }, res) => {
    // parse name param
    let name = params.name;
    let method;
    let fileExtension;
    let channelName = null;
    let channelId = null;
    // (a) handle channel requests
    if (name.charAt(0) === CHANNEL_CHAR) {
      channelName = name;
      const paginationPage = getPage(query);
      const channelIdIndex = channelName.indexOf(CLAIM_ID_CHAR);
      if (channelIdIndex !== -1) {
        channelId = channelName.substring(channelIdIndex + 1);
        channelName = channelName.substring(0, channelIdIndex);
      }
      logger.debug('channel name =', channelName);
      logger.debug('channel Id =', channelId);
      // 1. retrieve the channel contents
      getChannelContents(channelName, channelId)
      // 2. respond to the request
      .then(result => {
        if (result === NO_CHANNEL) { // no channel found
          res.status(200).render('noChannel');
        } else if (!result.claims) {  // channel found, but no claims
          res.status(200).render('channel', {
            channelName   : result.channelName,
            longChannelId : result.longChannelId,
            shortChannelId: result.shortChannelId,
            claims        : [],
            previousPage  : 0,
            currentPage   : 0,
            nextPage      : 0,
            totalPages    : 0,
            totalResults  : 0,
          });
        } else {  // channel found, with claims
          const totalPages = determineTotalPages(result.claims.length);
          res.status(200).render('channel', {
            channelName   : result.channelName,
            longChannelId : result.longChannelId,
            shortChannelId: result.shortChannelId,
            claims        : extractPageFromClaims(result.claims, paginationPage),
            previousPage  : determinePreviousPage(paginationPage),
            currentPage   : paginationPage,
            nextPage      : determineNextPage(totalPages, paginationPage),
            totalPages    : totalPages,
            totalResults  : result.claims.length,
          });
        }
      })
      .catch(error => {
        handleRequestError('serve', originalUrl, ip, error, res);
      });
    // (b) handle stream requests
    } else {
      if (name.indexOf('.') !== -1) {
        method = SERVE;
        if (headers['accept'] && headers['accept'].split(',').includes('text/html')) {
          method = SHOWLITE;
        }
        fileExtension = name.substring(name.indexOf('.') + 1);
        name = name.substring(0, name.indexOf('.'));
        logger.debug('file extension =', fileExtension);
      } else {
        method = SHOW;
      }
      logger.debug('claim name = ', name);
      logger.debug('method =', method);
      // 1. retrieve the asset and information
      getAsset(CLAIM, null, null, name, null)
      // 2. respond to the request
      .then(result => {
        logger.debug('getAsset result', result);
        if (result === NO_CLAIM) {
          res.status(200).render('noClaim');
        } else {
          return serveOrShowAsset(result, fileExtension, method, headers, originalUrl, ip, res);
        }
      })
      // 3. update the database
      .then(fileInfoForUpdate => {
        // if needed, this is where we would update the file
      })
      .catch(error => {
        handleRequestError('serve', originalUrl, ip, error, res);
      });
    }
  });
};
