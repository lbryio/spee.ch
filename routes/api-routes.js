const logger = require('winston');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const publishController = require('../controllers/publishController.js');
const lbryApi = require('../helpers/libraries/lbryApi.js');
const publishHelpers = require('../helpers/libraries/publishHelpers.js');
const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');

module.exports = app => {
  // route to run a claim_list request on the daemon
  app.get('/api/claim_list/:name', ({ ip, originalUrl, params }, res) => {
    // google analytics
    sendGoogleAnalytics('serve', ip, originalUrl);
    // log
    logger.verbose(`GET request on ${originalUrl} from ${ip}`);
    // serve the content
    lbryApi
      .getClaimsList(params.name)
      .then(claimsList => {
        postToStats('serve', originalUrl, ip, 'success');
        res.status(200).json(claimsList);
      })
      .catch(error => {
        errorHandlers.handleRequestError('publish', originalUrl, ip, error, res);
      });
  });
  // route to check whether spee.ch has published to a claim
  app.get('/api/isClaimAvailable/:name', ({ ip, originalUrl, params }, res) => {
    // log
    logger.verbose(`GET request on ${originalUrl} from ${ip}`);
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
  app.get('/api/resolve/:uri', ({ ip, originalUrl, params }, res) => {
    // google analytics
    sendGoogleAnalytics('serve', ip, originalUrl);
    // log
    logger.verbose(`GET request on ${originalUrl} from ${ip}`);
    // serve content
    lbryApi
      .resolveUri(params.uri)
      .then(resolvedUri => {
        postToStats('serve', originalUrl, ip, 'success');
        res.status(200).json(resolvedUri);
      })
      .catch(error => {
        errorHandlers.handleRequestError('publish', originalUrl, ip, error, res);
      });
  });
  // route to run a publish request on the daemon
  app.post('/api/publish', multipartMiddleware, ({ body, files, ip, originalUrl }, res) => {
    // google analytics
    sendGoogleAnalytics('publish', ip, originalUrl);
    // log
    logger.verbose(`POST request on ${originalUrl} from ${ip}`);
    // validate that a file was provided
    const file = files.speech || files.null;
    if (!file) {
      postToStats('publish', originalUrl, ip, 'Error: file');
      res.status(400).send('Error: No file was submitted or the key used was incorrect.  Files posted through this route must use a key of "speech" or null');
      return;
    }
    // validate name
    const name = body.name || file.name.substring(0, file.name.indexOf('.'));
    const invalidCharacters = /[^A-Za-z0-9,-]/.exec(name);
    if (invalidCharacters) {
      postToStats('publish', originalUrl, ip, 'Error: name');
      res.status(400).send('Error: The name you provided is not allowed.  Please use A-Z, a-z, 0-9, "_" and "-" only.');
      return;
    }
    // validate license
    const license = body.license || 'No License Provided';
    if ((license.indexOf('Public Domain') === -1) && (license.indexOf('Creative Commons') === -1)) {
      postToStats('puplish', originalUrl, ip, 'Error: license');
      res.status(400).send('Error: Only posts with a license of "Public Domain" or "Creative Commons" are eligible for publishing through spee.ch');
      return;
    }
    const nsfw = body.nsfw || true;
    switch (nsfw) {
      case true:
      case false:
      case 'true':
      case 'false':
      case 'on':
      case 'off':
      case 0:
      case '0':
      case 1:
      case '1':
        break;
      default:
        postToStats('publish', originalUrl, ip, 'Error: nsfw');
        res.status(400).send('Error: NSFW value was not accepted.  NSFW must be set to either true, false, "on", or "off"');
        return;
    }
    const fileName = file.name;
    const filePath = file.path;
    const fileType = file.type;
    /*
      note: make sure it's not a harmful file type
    */
    // prepare the publish parameters
    const publishParams = publishHelpers.createPublishParams(name, filePath, license, nsfw);
    // publish the file
    publishController
      .publish(publishParams, fileName, fileType)
      .then(result => {
        postToStats('publish', originalUrl, ip, 'success');
        res.status(200).json(result);
      })
      .catch(error => {
        errorHandlers.handleRequestError('publish', originalUrl, ip, error, res);
      });
  });
};
