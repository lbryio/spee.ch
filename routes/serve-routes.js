const logger = require('winston');
const { serveFile, showFile, showFileLite, getShortUrlFromClaimId } = require('../helpers/serveHelpers.js');
const { getAssetByChannel, getAssetByShortUrl, getAssetByClaimId, getAssetByName } = require('../controllers/serveController.js');
const { handleRequestError } = require('../helpers/errorHandlers.js');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');
const SERVE = 'SERVE';
const SHOW = 'SHOW';
const SHOWLITE = 'SHOWLITE';
const CHANNEL = 'CHANNEL';
const SHORTURL = 'SHORTURL';
const CLAIMID = 'CLAIMID';
const NAME = 'NAME';

function getAsset (claimType, channelName, shortUrl, fullClaimId, name) {
  switch (claimType) {
    case CHANNEL:
      return getAssetByChannel(channelName, name);
    case SHORTURL:
      return getAssetByShortUrl(shortUrl, name);
    case CLAIMID:
      return getAssetByClaimId(fullClaimId, name);
    case NAME:
      return getAssetByName(name);
    default:
      return new Error('that claim type was not found');
  }
}

function serveOrShowAsset (fileInfo, method, headers, originalUrl, ip, res) {
  // add file extension to the file info
  fileInfo['fileExt'] = fileInfo.fileName.substring(fileInfo.fileName.lastIndexOf('.'));
  // serve or show
  switch (method) {
    case SERVE:
      serveFile(fileInfo, res);
      sendGoogleAnalytics(method, headers, ip, originalUrl);
      postToStats('serve', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
      return fileInfo;
    case SHOWLITE:
      showFileLite(fileInfo, res);
      postToStats('show', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
      return fileInfo;
    case SHOW:
      return getShortUrlFromClaimId(fileInfo.claimId, fileInfo.height, fileInfo.name)
      .then(shortUrl => {
        fileInfo['shortUrl'] = shortUrl;
        showFile(fileInfo, res);
        postToStats('show', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
        return fileInfo;
      })
      .catch(error => {
        console.log('thowing error...');
        throw error;
      });
    default:
      logger.error('I did not recognize that method');
      break;
  }
}

function isValidClaimId (claimId) {
  return ((claimId.length === 40) && !/[^A-Za-z0-9]/g.test(claimId));
}

function isValidShortUrl (claimId) {
  return claimId.length === 1;  // really it should evaluate the short url itself
}

function isValidShortUrlOrClaimId (input) {
  return (isValidClaimId(input) || isValidShortUrl(input));
}

module.exports = (app) => {
  // route to serve a specific asset
  app.get('/:identifier/:name', ({ headers, ip, originalUrl, params }, res) => {
    let identifier = params.identifier;
    let name = params.name;
    let claimType;
    let channelName = null;
    let shortUrl = null;
    let fullClaimId = null;
    let method;
    let extension;
    // parse the name
    const positionOfExtension = name.indexOf('.');
    if (positionOfExtension >= 0) {
      extension = name.substring(positionOfExtension);
      name = name.substring(0, positionOfExtension);
      /* patch because twitter player preview adds '>' before file extension */
      if (name.indexOf('>') >= 0) {
        name = name.substring(0, name.indexOf('>'));
      }
      /* end patch */
      logger.debug('file extension =', extension);
      if (headers['accept'] && headers['accept'].split(',').includes('text/html')) {
        method = SHOWLITE;
      } else {
        method = SERVE;
      }
    } else {
      method = SHOW;
    }
    /* patch for backwards compatability with spee.ch/name/claim_id */
    if (isValidShortUrlOrClaimId(name) && !isValidShortUrlOrClaimId(identifier)) {
      let tempName = name;
      name = identifier;
      identifier = tempName;
    }
    /* end */
    logger.debug('claim name =', name);
    logger.debug('method =', method);
    // parse identifier for whether it is a channel, short url, or claim_id
    if (identifier.charAt(0) === '@') {
      channelName = identifier.substring(1);
      logger.debug('channel name =', channelName);
      claimType = CHANNEL;
    } else if (identifier.length === 40) {
      fullClaimId = identifier;
      logger.debug('full claim id =', fullClaimId);
      claimType = CLAIMID;
    } else if (identifier.length < 40) {
      shortUrl = identifier;
      logger.debug('short url =', shortUrl);
      claimType = SHORTURL;
    } else {
      logger.error('The URL provided could not be parsed');
      res.send('that url is invalid');
      return;
    };
    // 1. retrieve the asset and information
    getAsset(claimType, channelName, shortUrl, fullClaimId, name)
    // 2. serve or show
    .then(fileInfo => {
      if (!fileInfo) {
        res.status(200).render('noClaims');
      } else {
        return serveOrShowAsset(fileInfo, method, headers, originalUrl, ip, res);
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
  app.get('/:name', ({ headers, ip, originalUrl, params }, res) => {
    // parse name param
    let name = params.name;
    let method;
    let fileExtension;
    if (name.indexOf('.') !== -1) {
      method = SERVE;
      if (headers['accept'] && headers['accept'].split(',').includes('text/html')) {
        method = SHOWLITE;
      }
      fileExtension = name.substring(name.indexOf('.'));
      name = name.substring(0, name.indexOf('.'));
      logger.debug('file extension =', fileExtension);
    } else {
      method = SHOW;
      if (headers['accept'] && !headers['accept'].split(',').includes('text/html')) {
        method = SERVE;
      }
    }
    logger.debug('claim name = ', name);
    logger.debug('method =', method);
    // 1. retrieve the asset and information
    getAsset(NAME, null, null, null, name)
    // 2. serve or show
    .then(fileInfo => {
      if (!fileInfo) {
        res.status(200).render('noClaims');
      } else {
        return serveOrShowAsset(fileInfo, method, headers, originalUrl, ip, res);
      }
    })
    // 3. update the database
    .then(fileInfoForUpdate => {
      // if needed, this is where we would update the file
    })
    .catch(error => {
      handleRequestError('serve', originalUrl, ip, error, res);
    });
  });
};
