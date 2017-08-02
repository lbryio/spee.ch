const logger = require('winston');
const { serveFile, showFile, showFileLite } = require('../helpers/libraries/serveHelpers.js');
const { getAssetByChannel, getAssetByShortUrl, getAssetByClaimId } = require('../controllers/serveController.js');
const { postToStats } = require('../controllers/statsController.js');

const SERVE = 'SERVE';
const SHOW = 'SHOW';
const SHOWLITE = 'SHOWLITE';
const CHANNEL = 'CHANNEL';
const SHORTURL = 'SHORTURL';
const CLAIMID = 'CLAIMID';

function getAsset (claimType, channelName, shortUrl, fullClaimId, name) {
  switch (claimType) {
    case CHANNEL:
      return getAssetByChannel(channelName, name);
    case SHORTURL:
      return getAssetByShortUrl(shortUrl, name);
    case CLAIMID:
      return getAssetByClaimId(fullClaimId, name);
    default:
      return new Error('that claim type was not found');
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

    getAsset(claimType, channelName, shortUrl, fullClaimId, name)
      .then(fileInfo => {
        // add file extension to the file info
        fileInfo['fileExt'] = fileInfo.fileName.substring(fileInfo.fileName.lastIndexOf('.'));
        // test logging
        logger.debug(fileInfo);
        // serve or show
        if (!fileInfo) {
          res.status(200).render('noClaims');
          return;
        }
        switch (method) {
          case SERVE:
            serveFile(fileInfo, res);
            break;
          case SHOWLITE:
            postToStats('show', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
            showFileLite(fileInfo, res);
            break;
          case SHOW:
            postToStats('show', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
            showFile(fileInfo, res);
            break;
          default:
            logger.error('I did not recognize that method');
            break;
        }
      })
      .catch(error => {
        logger.error(error);
      });
  });
  // route to serve the winning asset at a claim
  app.get('/:name', ({ headers, ip, originalUrl, params }, res) => {
  });
};
