const logger = require('winston');
const { serveFile, showFile, showFileLite, getShortUrlFromClaimId } = require('../helpers/serveHelpers.js');
const { getAssetByChannel, getAssetByShortUrl, getAssetByClaimId, getAssetByName } = require('../controllers/serveController.js');
const { postToStats } = require('../controllers/statsController.js');
const { handleRequestError } = require('../helpers/errorHandlers.js');

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

function serveOrShowAsset (fileInfo, method, originalUrl, ip, res) {
  // add file extension to the file info
  fileInfo['fileExt'] = fileInfo.fileName.substring(fileInfo.fileName.lastIndexOf('.'));
  // test logging
  logger.debug(fileInfo);
  // serve or show
  switch (method) {
    case SERVE:
      serveFile(fileInfo, res);
      postToStats('serve', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
      return fileInfo;
    case SHOWLITE:
      showFileLite(fileInfo, res);
      postToStats('show', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
      return fileInfo;
    case SHOW:
      return getShortUrlFromClaimId(fileInfo.claimId, fileInfo.name)
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

module.exports = (app) => {
  // route to serve a specific asset
  app.get('/:identifier/:name', ({ headers, ip, originalUrl, params }, res) => {
    const identifier = params.identifier;
    let name = params.name;
    // parse identifier for whether it is a channel, short url, or claim_id
    let claimType;
    let channelName = null;
    let shortUrl = null;
    let fullClaimId = null;
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
      logger.error('that url does not compute');
      res.send('that url is invalid');
      return;
    };
    // parse the name
    let method;
    let desiredExtension;
    if (name.indexOf('.') !== -1) {
      method = SERVE;
      if (headers['accept'] && headers['accept'].split(',').includes('text/html')) {
        method = SHOWLITE;
      }
      desiredExtension = name.substring(name.indexOf('.'));
      name = name.substring(0, name.indexOf('.'));
      logger.debug('file extension =', desiredExtension);
    } else {
      method = SHOW;
      if (headers['accept'] && !headers['accept'].split(',').includes('text/html')) {
        method = SERVE;
      }
    }
    logger.debug('claim name = ', name);
    logger.debug('method =', method);
    // 1. retrieve the asset and information
    getAsset(claimType, channelName, shortUrl, fullClaimId, name)
    // 2. serve or show
    .then(fileInfo => {
      if (!fileInfo) {
        res.status(200).render('noClaims');
      } else {
        return serveOrShowAsset(fileInfo, method, originalUrl, ip, res);
      }
    })
    // 3. update the database
    .then(({channel, claimId, name}) => {
      logger.debug('update db / create new record for:', channel, claimId, name);
      // if asset was found locally, update db (resolve the claim to see if a newer version exists and then get && update db if needed)
      // if asset was retrieved from lbrynet, create db record
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
    let desiredExtension;
    if (name.indexOf('.') !== -1) {
      method = SERVE;
      if (headers['accept'] && headers['accept'].split(',').includes('text/html')) {
        method = SHOWLITE;
      }
      desiredExtension = name.substring(name.indexOf('.'));
      name = name.substring(0, name.indexOf('.'));
      logger.debug('file extension =', desiredExtension);
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
        return serveOrShowAsset(fileInfo, method, originalUrl, ip, res);
      }
    })
    // 3. update the database
    .then(({channel, claimId, name}) => {
      logger.debug('update db / create new record');
      // if asset was found locally, update db (resolve the claim to see if a newer version exists and then get && update db if needed)
      // if asset was retrieved from lbrynet, create db record
    })
    .catch(error => {
      handleRequestError('serve', originalUrl, ip, error, res);
    });
  });
};
