const logger = require('winston');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const { publish } = require('../controllers/publishController.js');
const { getClaimList, resolveUri } = require('../helpers/lbryApi.js');
const { createPublishParams, validateFile, checkNameAvailability } = require('../helpers/publishHelpers.js');
const errorHandlers = require('../helpers/errorHandlers.js');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');

module.exports = (app, hostedContentPath) => {
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
    checkNameAvailability(params.name)
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
    const license = body.license || 'No License Provided';
    const nsfw = body.nsfw || true;
    try {
      validateFile(file, name, license, nsfw);
    } catch (error) {
      postToStats('publish', originalUrl, ip, null, null, error.message);
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
    publish(publishParams, fileName, fileType)
    .then(result => {
      postToStats('publish', originalUrl, ip, null, null, 'success');
      res.status(200).json(result);
    })
    .catch(error => {
      errorHandlers.handleRequestError('publish', originalUrl, ip, error, res);
    });
  });
};
