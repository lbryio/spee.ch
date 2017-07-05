const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const serveController = require('../controllers/serveController.js');
const logger = require('winston');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');

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

function sendAnalyticsAndLog (headers, ip, originalUrl) {
  // google analytics
  sendGoogleAnalytics('serve', headers, ip, originalUrl);
  // logging
  logger.verbose(`GET request on ${originalUrl} from ${ip}`);
}

module.exports = (app) => {
  // route to fetch one free public claim
  app.get('/:name/:claim_id', ({ headers, ip, ips, originalUrl, params }, res) => {
    logger.verbose('ip', ip);
    logger.verbose('ips', ips);
    logger.verbose('headers', headers);
    logger.verbose('user-agent', headers['user-agent']);
    logger.verbose('accept-language', headers['accept-language']);
    sendAnalyticsAndLog(headers, ip, originalUrl);
    // begin image-serve processes
    serveController
      .getClaimByClaimId(params.name, params.claim_id)
      .then(fileInfo => {
        // check to make sure a file was found
        if (!fileInfo) {
          res.status(307).render('noClaims');
          return;
        }
        postToStats('serve', originalUrl, ip, 'success');
        serveFile(fileInfo, res);
      })
      .catch(error => {
        errorHandlers.handleRequestError('serve', originalUrl, ip, error, res);
      });
  });
  // route to fetch one free public claim
  app.get('/:name', ({ headers, ip, originalUrl, params }, res) => {
    sendAnalyticsAndLog(headers, ip, originalUrl);
    // begin image-serve processes
    serveController
      .getClaimByName(params.name)
      .then(fileInfo => {
        // check to make sure a file was found
        if (!fileInfo) {
          res.status(307).render('noClaims');
          return;
        }
        postToStats('serve', originalUrl, ip, 'success');
        serveFile(fileInfo, res);
      })
      .catch(error => {
        errorHandlers.handleRequestError('serve', originalUrl, ip, error, res);
      });
  });
};
