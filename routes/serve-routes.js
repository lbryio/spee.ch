const logger = require('winston');
const { getAssetByClaim, getChannelContents, getAssetByChannel, serveOrShowAsset } = require('../controllers/serveController.js');
const { handleRequestError } = require('../helpers/errorHandlers.js');
const { SERVE, SHOW, SHOWLITE, CHANNEL, CLAIM, CHANNELID_INDICATOR } = require('../helpers/constants.js');

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

module.exports = (app) => {
  // route to serve a specific asset
  app.get('/:identifier/:name', ({ headers, ip, originalUrl, params }, res) => {
    let identifier = params.identifier;
    let name = params.name;
    let claimType;
    let channelName = null;
    let claimId = null;
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
    } else {
      claimId = identifier;
      logger.debug('claim id =', claimId);
      claimType = CLAIM;
    }
    // 1. retrieve the asset and information
    getAsset(claimType, channelName, channelId, name, claimId)
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
      getAsset(CLAIM, null, null, name, null)
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
