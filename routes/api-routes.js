const logger = require('winston');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const publishController = require('../controllers/publishController.js');
const lbryApi = require('../helpers/libraries/lbryApi.js');
const publishHelpers = require('../helpers/libraries/publishHelpers.js');
const errorHandlers = require('../helpers/libraries/errorHandlers.js');

module.exports = app => {
  // route to run a claim_list request on the daemon
  app.get('/api/claim_list/:claim', ({ originalUrl, params }, res) => {
    logger.debug(`GET request on ${originalUrl}`);
    lbryApi
      .getClaimsList(params.claim)
      .then(claimsList => {
        res.status(200).json(claimsList);
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
  // route to run a resolve request on the daemon
  app.get('/api/resolve/:uri', ({ originalUrl, params }, res) => {
    logger.debug(`GET request on ${originalUrl}`);
    lbryApi
      .resolveUri(params.uri)
      .then(resolvedUri => {
        res.status(200).json(resolvedUri);
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
  // route to run a publish request on the daemon
  app.post('/api/publish', multipartMiddleware, ({ originalUrl, body, files }, res) => {
    logger.debug(`POST request on ${originalUrl}`);
    const file = files.thumbnail || files.null;
    if (!file) {
      res.status(400).send('error: No file was submitted or the key used was incorrect.  Files posted through this route must use a key of "thumbnail" or null');
      return;
    }
    const name = body.claim || file.name.substring(0, file.name.indexOf('.'));
    const license = body.license || 'No License Provided';
    const nsfw = body.nsfw || true;
    const fileName = file.name;
    const filePath = file.path;
    const fileType = file.type;
    /*
      make sure it's not a harmful file type
    */
    // prepare the publish parameters
    const publishParams = publishHelpers.createPublishParams(name, filePath, license, nsfw);
    // publish the file
    publishController
      .publish(publishParams, fileName, fileType)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
};
