const logger = require('winston');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const publishController = require('../controllers/publishController.js');
const lbryApi = require('../helpers/libraries/lbryApi.js');
const { createPublishParams, validateFile } = require('../helpers/libraries/publishHelpers.js');
const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');

const config = require('config');
const hostedContentPath = config.get('Database.DownloadDirectory');

module.exports = app => {
  // route to return a file directly
  app.get('/api/streamFile/:name', ({ params }, res) => {
    const filePath = `${hostedContentPath}${params.name}`;
    res.status(200).sendFile(filePath);
  });
  // route to run a claim_list request on the daemon
  app.get('/api/claim_list/:name', ({ headers, ip, originalUrl, params }, res) => {
    // google analytics
    sendGoogleAnalytics('serve', headers, ip, originalUrl);
    // serve the content
    lbryApi
      .getClaimsList(params.name)
      .then(claimsList => {
        postToStats('serve', originalUrl, ip, null, null, null, null, 'success');
        res.status(200).json(claimsList);
      })
      .catch(error => {
        errorHandlers.handleRequestError('publish', originalUrl, ip, error, res);
      });
  });
  // route to check whether spee.ch has published to a claim
  app.get('/api/isClaimAvailable/:name', ({ ip, originalUrl, params }, res) => {
    // send response
    publishController
      .checkNameAvailability(params.name)
      .then(result => {
        if (result === true) {
          res.status(200).json(true);
        } else {
          logger.debug(`Rejecting publish request because ${params.name} has already been published via spee.ch`);
          res.status(200).json(false);
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  // route to run a resolve request on the daemon
  app.get('/api/resolve/:uri', ({ headers, ip, originalUrl, params }, res) => {
    // google analytics
    sendGoogleAnalytics('serve', headers, ip, originalUrl);
    // serve content
    lbryApi
      .resolveUri(params.uri)
      .then(resolvedUri => {
        postToStats('serve', originalUrl, ip, null, null, null, null, 'success');
        res.status(200).json(resolvedUri);
      })
      .catch(error => {
        errorHandlers.handleRequestError('publish', originalUrl, ip, error, res);
      });
  });

  // route to run a publish request on the daemon
  app.post('/api/publish', multipartMiddleware, ({ body, files, headers, ip, originalUrl }, res) => {
    // google analytics
    sendGoogleAnalytics('publish', headers, ip, originalUrl);
    // validate that a file was provided
    const file = files.speech || files.null;
    const name = body.name || file.name.substring(0, file.name.indexOf('.'));
    const license = body.license || 'No License Provided';
    const nsfw = body.nsfw || true;
    try {
      validateFile(file, name, license, nsfw);
    } catch (error) {
      postToStats('publish', originalUrl, ip, null, null, null, null, error.message);
      logger.debug('rejected >>', error.message);
      res.status(400).send(error.message);
      return;
    }

    // prepare the publish parameters
    const fileName = file.name;
    const filePath = file.path;
    const fileType = file.type;
    const publishParams = createPublishParams(name, filePath, license, nsfw);
    // publish the file
    publishController
      .publish(publishParams, fileName, fileType)
      .then(result => {
        postToStats('publish', originalUrl, ip, null, null, null, null, 'success');
        res.status(200).json(result);
      })
      .catch(error => {
        errorHandlers.handleRequestError('publish', originalUrl, ip, error, res);
      });
  });
};
