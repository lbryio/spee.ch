const logger = require('winston');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const db = require('../models');
const { publish } = require('../controllers/publishController.js');
const { getClaimList, resolveUri } = require('../helpers/lbryApi.js');
const { createPublishParams, validateApiPublishRequest, validatePublishSubmission, cleanseNSFW, cleanseChannelName, checkClaimNameAvailability, checkChannelAvailability } = require('../helpers/publishHelpers.js');
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
  app.post('/api/publish', multipartMiddleware, (req, res) => {
    logger.debug(req);
    const body = req.body;
    const files = req.files;
    try {
      validateApiPublishRequest(body, files);
    } catch (error) {
      logger.debug('publish request rejected, insufficient request parameters');
      res.status(400).json({success: false, message: error.message});
      return;
    }
    // required inputs
    const file = files.file;
    const fileName = file.name;
    const filePath = file.path;
    const fileType = file.type;
    const name = body.name;
    let nsfw = body.nsfw;
    // cleanse nsfw
    nsfw = cleanseNSFW(nsfw);
    // validate file, name, license, and nsfw
    try {
      validatePublishSubmission(file, name, nsfw);
    } catch (error) {
      logger.debug('publish request rejected');
      res.status(400).json({success: false, message: error.message});
      return;
    }
    logger.debug(`name: ${name}, nsfw: ${nsfw}`);
    // optional inputs
    const license = body.license || null;
    const title = body.title || null;
    const description = body.description || null;
    let channelName = body.channelName || null;
    channelName = cleanseChannelName(channelName);
    const channelPassword = body.channelPassword || null;
    logger.debug(`license: ${license} title: "${title}" description: "${description}" channelName: "${channelName}" channelPassword: "${channelPassword}"`);
    // check channel authorization
    authenticateChannelCredentials(channelName, channelPassword)
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
      return createPublishParams(filePath, name, title, description, license, nsfw, channelName);
    })
    .then(publishParams => {
      logger.debug('publishParams:', publishParams);
      // publish the asset
      return publish(publishParams, fileName, fileType);
    })
    .then(result => {
      // postToStats('publish', originalUrl, ip, null, null, 'success');
      res.status(200).json({
        success: true,
        message: {
          url   : `spee.ch/${result.claim_id}/${name}`,
          lbryTx: result,
        },
      });
    })
    .catch(error => {
      logger.error('publish api error', error);
      res.status(400).json({success: false, message: error.message});
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
        console.log('sending back short channel id', shortId);
        res.status(200).json(shortId);
      })
      .catch(error => {
        logger.error('api error getting short channel id', error);
        res.status(400).json(error.message);
      });
  });
};
