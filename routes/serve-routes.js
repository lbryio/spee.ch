const logger = require('winston');
const { serveFile, showFile, showFileLite, getShortIdFromClaimId, resolveAgainstClaimTable, getChannelContents } = require('../helpers/serveHelpers.js');
const { getAssetByChannel, getAssetByShortId, getAssetByClaimId, getAssetByName } = require('../controllers/serveController.js');
const { handleRequestError } = require('../helpers/errorHandlers.js');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');
const SERVE = 'SERVE';
const SHOW = 'SHOW';
const SHOWLITE = 'SHOWLITE';
const CHANNEL = 'CHANNEL';
const CLAIM_ID_SHORT = 'CLAIM_ID_SHORT';
const CLAIM_ID_LONG = 'CLAIM_ID_LONG';
const CLAIM_NAME = 'CLAIM_NAME';
const CHANNELID_INDICATOR = ':';

function getAsset (claimType, channelName, channelId, shortId, fullClaimId, name) {
  switch (claimType) {
    case CHANNEL:
      return getAssetByChannel(channelName, channelId, name);
    case CLAIM_ID_SHORT:
      return getAssetByShortId(shortId, name);
    case CLAIM_ID_LONG:
      return getAssetByClaimId(fullClaimId, name);
    case CLAIM_NAME:
      return getAssetByName(name);
    default:
      return new Error('that claim type was not found');
  }
}

function serveOrShowAsset (fileInfo, extension, method, headers, originalUrl, ip, res) {
  // add file extension to the file info
  if (extension === '.gifv') {
    fileInfo['fileExt'] = '.gifv';
  } else {
    fileInfo['fileExt'] = fileInfo.fileName.substring(fileInfo.fileName.lastIndexOf('.'));
  }
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
      return getShortIdFromClaimId(fileInfo.claimId, fileInfo.height, fileInfo.name)
      .then(shortId => {
        fileInfo['shortId'] = shortId;
        return resolveAgainstClaimTable(fileInfo.name, fileInfo.claimId);
      })
      .then(resolveResult => {
        logger.debug('resolve result', resolveResult);
        fileInfo['title'] = resolveResult.title;
        fileInfo['description'] = resolveResult.description;
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

function isValidShortId (claimId) {
  return claimId.length === 1;  // really it should evaluate the short url itself
}

function isValidShortIdOrClaimId (input) {
  return (isValidClaimId(input) || isValidShortId(input));
}

module.exports = (app) => {
  // route to serve a specific asset
  app.get('/:identifier/:name', ({ headers, ip, originalUrl, params }, res) => {
    let identifier = params.identifier;
    let name = params.name;
    let claimType;
    let channelName = null;
    let shortId = null;
    let fullClaimId = null;
    let channelId = null;
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
      claimType = CHANNEL;
      const channelIdIndex = channelName.indexOf(CHANNELID_INDICATOR);
      if (channelIdIndex !== -1) {
        channelId = channelName.substring(channelIdIndex + 1);
        channelName = channelName.substring(0, channelIdIndex);
      }
      logger.debug('channel name =', channelName);
    } else if (identifier.length === 40) {
      fullClaimId = identifier;
      logger.debug('full claim id =', fullClaimId);
      claimType = CLAIM_ID_LONG;
    } else if (identifier.length < 40) {
      shortId = identifier;
      logger.debug('short claim id =', shortId);
      claimType = CLAIM_ID_SHORT;
    } else {
      logger.error('The URL provided could not be parsed');
      res.send('that url is invalid');
      return;
    };
    // 1. retrieve the asset and information
    getAsset(claimType, channelName, channelId, shortId, fullClaimId, name)
    // 2. serve or show
    .then(fileInfo => {
      logger.debug('fileInfo', fileInfo);
      if (!fileInfo) {
        res.status(200).render('noClaims');
      } else {
        return serveOrShowAsset(fileInfo, extension, method, headers, originalUrl, ip, res);
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
    let channelName = null;
    let channelId = null;
    if (name.charAt(0) === '@') {
      channelName = name;
      const channelIdIndex = channelName.indexOf(CHANNELID_INDICATOR);
      if (channelIdIndex !== -1) {
        channelId = channelName.substring(channelIdIndex + 1);
        channelName = channelName.substring(0, channelIdIndex);
      }
      logger.debug('channel name =', channelName);
      logger.debug('channel Id =', channelId);
      // 1. retrieve the channel contents
      getChannelContents(channelName, channelId)
      // 2. respond to the request
      .then(channelContents => {
        if (!channelContents) {
          res.status(200).render('noChannel');
        } else {
          const handlebarsData = {
            channelName,
            channelContents,
          };
          res.status(200).render('channel', handlebarsData);
        }
      })
      .catch(error => {
        handleRequestError('serve', originalUrl, ip, error, res);
      });
    } else {
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
      getAsset(CLAIM_NAME, null, null, null, null, name)
      // 2. respond to the request
      .then(fileInfo => {
        if (!fileInfo) {
          res.status(200).render('noClaims');
        } else {
          return serveOrShowAsset(fileInfo, null, method, headers, originalUrl, ip, res);
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
