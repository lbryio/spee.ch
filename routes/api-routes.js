const logger = require('winston');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: '/home/lbry/test/'});
const db = require('../models');
const { publish } = require('../controllers/publishController.js');
const { getClaimList, resolveUri } = require('../helpers/lbryApi.js');
const { createPublishParams, validateApiPublishRequest, validatePublishSubmission, cleanseChannelName, checkClaimNameAvailability, checkChannelAvailability } = require('../helpers/publishHelpers.js');
const errorHandlers = require('../helpers/errorHandlers.js');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');
const { authenticateChannelCredentials } = require('../auth/authentication.js');

module.exports = (app) => {
  // route to run a claim_list request on the daemon
  app.get('/api/claim_list/:name', ({ headers, ip, originalUrl, params }, res) => {
    // google analytics
    sendGoogleAnalytics('SERVE', headers, ip, originalUrl);
    // serve the content
    getClaimList(params.name)
    .then(claimsList => {
      postToStats('serve', originalUrl, ip, null, null, 'success');
      res.status(200).json(claimsList);
    })
    .catch(error => {
      errorHandlers.handleApiError('claim_list', originalUrl, ip, error, res);
    });
  });
  // route to check whether spee.ch has published to a claim
  app.get('/api/isClaimAvailable/:name', ({ params }, res) => {
    // send response
    checkClaimNameAvailability(params.name)
    .then(result => {
      if (result === true) {
        res.status(200).json(true);
      } else {
        logger.debug(`Rejecting '${params.name}' because that name has already been claimed on spee.ch`);
        res.status(200).json(false);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
  });
  // route to check whether spee.ch has published to a channel
  app.get('/api/isChannelAvailable/:name', ({ params }, res) => {
    checkChannelAvailability(params.name)
      .then(result => {
        if (result === true) {
          res.status(200).json(true);
        } else {
          logger.debug(`Rejecting '${params.name}' because that channel has already been claimed on spee.ch`);
          res.status(200).json(false);
        }
      })
      .catch(error => {
        logger.debug('api/isChannelAvailable/ error', error);
        res.status(500).json(error);
      });
  });
  // route to run a resolve request on the daemon
  app.get('/api/resolve/:uri', ({ headers, ip, originalUrl, params }, res) => {
    // google analytics
    sendGoogleAnalytics('SERVE', headers, ip, originalUrl);
    // serve content
    resolveUri(params.uri)
    .then(resolvedUri => {
      postToStats('serve', originalUrl, ip, null, null, 'success');
      res.status(200).json(resolvedUri);
    })
    .catch(error => {
      errorHandlers.handleApiError('resolve', originalUrl, ip, error, res);
    });
  });
  // route to run a publish request on the daemon
  app.post('/api/publish', multipartMiddleware, ({ body, files, ip, originalUrl, user }, res) => {
    logger.debug('api/publish body:', body);
    logger.debug('api/publish body:', files);
    let file, fileName, filePath, fileType, name, nsfw, license, title, description, thumbnail, anonymous, skipAuth, channelName, channelPassword;
    // validate that mandatory parts of the request are present
    try {
      validateApiPublishRequest(body, files);
    } catch (error) {
      logger.debug('publish request rejected, insufficient request parameters');
      res.status(400).json({success: false, message: error.message});
      return;
    }
    // validate file, name, license, and nsfw
    file = files.file;
    fileName = file.path.substring(file.path.lastIndexOf('/') + 1);
    filePath = file.path;
    fileType = file.type;
    name = body.name;
    nsfw = (body.nsfw === 'true');
    try {
      validatePublishSubmission(file, name, nsfw);
    } catch (error) {
      logger.debug('publish request rejected');
      res.status(400).json({success: false, message: error.message});
      return;
    }
    // optional inputs
    license = body.license || null;
    title = body.title || null;
    description = body.description || null;
    thumbnail = body.thumbnail || null;
    anonymous = (body.channelName === 'null') || (body.channelName === undefined);
    if (user) {
      channelName = user.channelName || null;
    } else {
      channelName = body.channelName || null;
    }
    channelPassword = body.channelPassword || null;
    skipAuth = false;
    // case 1: publish from spee.ch, client logged in
    if (user) {
      skipAuth = true;
      if (anonymous) {
        channelName = null;
      }
    // case 2: publish from api or spee.ch, client not logged in
    } else {
      if (anonymous) {
        skipAuth = true;
        channelName = null;
      }
    }
    channelName = cleanseChannelName(channelName);
    logger.debug(`name: ${name}, license: ${license} title: "${title}" description: "${description}" channelName: "${channelName}" channelPassword: "${channelPassword}" nsfw: "${nsfw}"`);
    // check channel authorization
    authenticateChannelCredentials(skipAuth, channelName, channelPassword)
    .then(result => {
      if (!result) {
        throw new Error('Authentication failed, you do not have access to that channel');
      }
      // make sure the claim name is available
      return checkClaimNameAvailability(name);
    })
    .then(result => {
      if (!result) {
        throw new Error('That name is already in use by spee.ch.');
      }
      // create publish parameters object
      return createPublishParams(filePath, name, title, description, license, nsfw, thumbnail, channelName);
    })
    .then(publishParams => {
      logger.debug('publishParams:', publishParams);
      // publish the asset
      return publish(publishParams, fileName, fileType);
    })
    .then(result => {
      res.status(200).json({
        success: true,
        message: {
          name,
          url   : `spee.ch/${result.claim_id}/${name}`,
          lbryTx: result,
        },
      });
    })
    .catch(error => {
      errorHandlers.handleApiError('publish', originalUrl, ip, error, res);
    });
  });

  // route to get a short claim id from long claim Id
  app.get('/api/shortClaimId/:longId/:name', ({ originalUrl, ip, params }, res) => {
    // serve content
    db.Claim.getShortClaimIdFromLongClaimId(params.longId, params.name)
      .then(shortId => {
        res.status(200).json(shortId);
      })
      .catch(error => {
        logger.error('api error getting short channel id', error);
        res.status(400).json(error.message);
      });
  });
  // route to get a short channel id from long channel Id
  app.get('/api/shortChannelId/:longId/:name', ({ ip, originalUrl, params }, res) => {
    // serve content
    db.Certificate.getShortChannelIdFromLongChannelId(params.longId, params.name)
      .then(shortId => {
        logger.debug('sending back short channel id', shortId);
        res.status(200).json(shortId);
      })
      .catch(error => {
        logger.error('api error getting short channel id', error);
        errorHandlers.handleApiError('short channel id', originalUrl, ip, error, res);
      });
  });
};
