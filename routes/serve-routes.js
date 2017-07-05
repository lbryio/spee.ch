const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const serveController = require('../controllers/serveController.js');
const logger = require('winston');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');

function serveFile ({ fileName, fileType, filePath }, res) {
  logger.info(`serving file ${fileName}`);
  // set default options
  let options = {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Content-Type'          : fileType,
    },
  };
  // adjust default options as needed
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

function servePage ({ fileName, fileType, filePath }, res) {
  logger.info(`serving show page for ${fileName}`);
  // set default options
  let options = {
    name: fileName,
    type: {
      jpeg: false,
      gif : false,
      png : false,
      mp4 : false,
    },
    path: filePath,
  };
  switch (fileType) {
    case 'image/jpeg':
      options['type']['jpeg'] = true;
      break;
    case 'image/gif':
      options['type']['gif'] = true;
      break;
    case 'image/png':
      options['type']['png'] = true;
      break;
    case 'video/mp4':
      options['type']['mp4'] = true;
      break;
    default:
      options['type']['jpeg'] = true;
      logger.warn('sending show page with unknown file type');
      break;
  }
  // send file
  res.status(200).render('show', options);
}

function sendAnalyticsAndLog (headers, ip, originalUrl) {
  logger.verbose('headers', headers);
  // google analytics
  sendGoogleAnalytics('serve', headers, ip, originalUrl);
  // logging
  logger.verbose(`GET request on ${originalUrl} from ${ip}`);
}

module.exports = (app) => {
  // route to fetch one free public claim
  app.get('/:name/:claim_id', ({ headers, ip, originalUrl, params }, res) => {
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
        // serve the file or the show route
        const mimetypes = headers['accept'].split(',');
        if (mimetypes.includes('text/html')) {
          postToStats('show', originalUrl, ip, 'success');
          servePage(fileInfo, res);
        } else {
          postToStats('serve', originalUrl, ip, 'success');
          serveFile(fileInfo, res);
        }
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
        // serve the file or the show route
        const mimetypes = headers['accept'].split(',');
        if (mimetypes.includes('text/html')) {
          postToStats('show', originalUrl, ip, 'success');
          servePage(fileInfo, res);
        } else {
          postToStats('serve', originalUrl, ip, 'success');
          serveFile(fileInfo, res);
        }
      })
      .catch(error => {
        errorHandlers.handleRequestError('serve', originalUrl, ip, error, res);
      });
  });
};
