const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const lbryApi = require('../helpers/libraries/lbryApi.js');
const logger = require('winston');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const publishController = require('../helpers/libraries/publishController.js');
const publishHelpers = require('../helpers/libraries/publishHelpers.js');

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
    console.log('>> req.files:', files);
    console.log(' >> req.body:', body);
    const name = body.claimName;
    const license = body.license;
    const nsfw = body.nsfw;
    const fileName = files.file1.name;
    const filePath = files.file1.path;
    const fileType = files.file1.type;
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

    if (files) {
      res.status(200).json({'status': 'file(s) received'});
    } else {
      res.status(400).josn({'status': 'no files(s) received'});
    }
  });
};
