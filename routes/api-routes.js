const logger = require('winston');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const db = require('../models');
const { publish } = require('../controllers/publishController.js');
const { getClaimList, resolveUri } = require('../helpers/lbryApi.js');
const { createPublishParams, validateFile, checkClaimNameAvailability, checkChannelAvailability } = require('../helpers/publishHelpers.js');
const errorHandlers = require('../helpers/errorHandlers.js');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');
const { authenticateApiPublish } = require('../auth/authentication.js');

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
      errorHandlers.handleRequestError('publish', originalUrl, ip, error, res);
    });
  });
  // route to check whether spee.ch has published to a claim
  app.get('/api/isClaimAvailable/:name', ({ ip, originalUrl, params }, res) => {
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
      errorHandlers.handleRequestError('publish', originalUrl, ip, error, res);
    });
  });
  // route to run a publish request on the daemon
  app.post('/api/publish', multipartMiddleware, ({ body, files, headers, ip, originalUrl }, res) => {
    // google analytics
    sendGoogleAnalytics('PUBLISH', headers, ip, originalUrl);
    // validate that a file was provided
    const file = files.speech || files.null;
    const name = body.name || file.name.substring(0, file.name.indexOf('.'));
    const title = body.title || null;
    const description = body.description || null;
    const license = body.license || 'No License Provided';
    const nsfw = body.nsfw || null;
    const channelName = body.channelName || 'none';
    const channelPassword = body.channelPassword || null;
    logger.debug(`name: ${name}, license: ${license}, nsfw: ${nsfw}`);
    try {
      validateFile(file, name, license, nsfw);
    } catch (error) {
      postToStats('publish', originalUrl, ip, null, null, error.message);
      logger.debug('rejected >>', error.message);
      res.status(400).send(error.message);
      return;
    }
    const fileName = file.name;
    const filePath = file.path;
    const fileType = file.type;
    // channel authorization
    authenticateApiPublish(channelName, channelPassword)
    .then(result => {
      if (!result) {
        res.status(401).send('Authentication failed, you do not have access to that channel');
        throw new Error('authentication failed');
      }
      return createPublishParams(name, filePath, title, description, license, nsfw, channelName);
    })
    // create publish parameters object
    .then(publishParams => {
      return publish(publishParams, fileName, fileType);
    })
    // publish the asset
    .then(result => {
      postToStats('publish', originalUrl, ip, null, null, 'success');
      res.status(200).json(result);
    })
    .catch(error => {
      logger.error('publish api error', error);
    });
  });
  // route to get a short claim id from long claim Id
  app.get('/api/shortClaimId/:longId/:name', ({ originalUrl, ip, params }, res) => {
    // serve content
    db.getShortClaimIdFromLongClaimId(params.longId, params.name)
      .then(shortId => {
        res.status(200).json(shortId);
      })
      .catch(error => {
        logger.error('api error getting short channel id', error);
        res.status(400).json(error.message);
      });
  });
  // route to get a short channel id from long channel Id
  app.get('/api/shortChannelId/:longId/:name', ({ params }, res) => {
    // serve content
    db.getShortChannelIdFromLongChannelId(params.longId, params.name)
      .then(shortId => {
        res.status(200).json(shortId);
      })
      .catch(error => {
        logger.error('api error getting short channel id', error);
        res.status(400).json(error.message);
      });
  });
};
