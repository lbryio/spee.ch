const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const serveController = require('../controllers/serveController.js');
const logger = require('winston');

function serveFile ({ fileName, fileType, filePath }, res) {
  logger.info(`serving file ${fileName} from ${filePath}`);
  // set default options
  const options = {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Content-Type'          : fileType,
    },
  };
  // adjust default options as needed
  // eslint-disable-next-line camelcase
  switch (fileType) {
    case 'image/jpeg':
      break;
    case 'image/gif':
      break;
    case 'image/png':
      break;
    case 'video/mp4':
      break;
    default:
      logger.warn('sending unknown file type as .jpeg');
      options['headers']['Content-Type'] = 'image/jpeg';
      break;
  }
  // send file
  res.status(200).sendFile(filePath, options);
}

module.exports = (app, ua, googleAnalyticsId) => {
  // route to fetch one free public claim
  app.get('/:name/:claim_id', ({ originalUrl, params }, res) => {
    logger.info(`Get request on ${originalUrl}`);
    const routeString = `${params.name}/${params.claim_id}`;
    // google analytics
    ua(googleAnalyticsId, { https: true }).event('Serve Route', '/name/claimId', routeString).send();
    // begin image-serve processes
    serveController
      .getClaimByClaimId(params.name, params.claim_id)
      .then(fileInfo => {
        logger.debug(`${originalUrl} getClaimByClaimId returned successfully.`);
        serveFile(fileInfo, res);
      })
      .catch(error => {
        logger.error(`${originalUrl} getClaimByClaimId returned an error.`, error);
        errorHandlers.handleRequestError(error, res);
      });
  });
  // route to fetch one free public claim
  app.get('/:name', ({ originalUrl, params }, res) => {
    logger.info(`Get request on ${originalUrl}`);
    // google analytics
    ua(googleAnalyticsId, { https: true }).event('Serve Route', '/name', params.name).send();
    // begin image-serve processes
    serveController
      .getClaimByName(params.name)
      .then(fileInfo => {
        logger.debug(`${originalUrl} getClaimByName returned successfully.`);
        serveFile(fileInfo, res);
      })
      .catch(error => {
        logger.error(`${originalUrl} getClaimByName returned an error.`, error);
        errorHandlers.handleRequestError(error, res);
      });
  });
};
