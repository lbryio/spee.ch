const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const serveController = require('../controllers/serveController.js');
const logger = require('winston');
const { postToAnalytics } = require('../helpers/libraries/analytics');

function serveFile ({ fileName, fileType, filePath }, res) {
  logger.info(`serving file ${fileName}`);
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

module.exports = (app) => {
  // route to fetch one free public claim
  app.get('/:name/:claim_id', ({ originalUrl, params, ips, headers }, res) => {
    logger.debug(`GET request on ${originalUrl} from ${ips}`);
    logger.debug(`headers ${headers}`);
    // begin image-serve processes
    serveController
      .getClaimByClaimId(params.name, params.claim_id)
      .then(fileInfo => {
        postToAnalytics('serve', originalUrl, ips, 'success');
        serveFile(fileInfo, res);
      })
      .catch(error => {
        errorHandlers.handleRequestError('serve', originalUrl, ips, error, res);
      });
  });
  // route to fetch one free public claim
  app.get('/:name', ({ originalUrl, params, ips, headers }, res) => {
    logger.debug(`GET request on ${originalUrl} from ${ips}`);
    logger.debug(`headers ${headers}`);
    // begin image-serve processes
    serveController
      .getClaimByName(params.name)
      .then(fileInfo => {
        postToAnalytics('serve', originalUrl, ips, 'success');
        serveFile(fileInfo, res);
      })
      .catch(error => {
        errorHandlers.handleRequestError('serve', originalUrl, ips, error, res);
      });
  });
};
