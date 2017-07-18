const logger = require('winston');
const { getClaimByClaimId, getClaimByName } = require('../controllers/serveController.js');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');
const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const { serveFile } = require('../helpers/libraries/serveHelpers.js');

module.exports = (app) => {
  // route to serve a specific asset
  app.get('/:name/:claim_id', ({ headers, ip, originalUrl, params }, res) => {
    // google analytics
    sendGoogleAnalytics('serve', headers, ip, originalUrl);
    // begin image-serve processes
    getClaimByClaimId(params.name, params.claim_id)
      .then(fileInfo => {
        logger.debug('file info:', fileInfo);
        // check to make sure a file was found
        if (!fileInfo) {
          res.status(307).render('noClaims');
          return;
        }
        // serve the file or the show route
        if (headers['accept']) { // note: added b/c some requests errored out due to no accept param in header
          const mimetypes = headers['accept'].split(',');
          if (mimetypes.includes('text/html')) {
            postToStats('show', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
            res.status(200).render('showLite', { fileInfo });
          } else {
            postToStats('serve', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
            serveFile(fileInfo, res);
          }
        } else {
          postToStats('serve', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
          serveFile(fileInfo, res);
        }
      })
      .catch(error => {
        errorHandlers.handleRequestError('serve', originalUrl, ip, error, res);
      });
  });
  // route to serve the winning asset at a claim
  app.get('/:name', ({ headers, ip, originalUrl, params }, res) => {
    // google analytics
    sendGoogleAnalytics('serve', headers, ip, originalUrl);
    // begin image-serve processes
    getClaimByName(params.name)
      .then(fileInfo => {
        // check to make sure a file was found
        if (!fileInfo) {
          res.status(307).render('noClaims');
          return;
        }
        // serve the file or the show route
        if (headers['accept']) { // note: added b/c some requests errored out due to no accept param in header
          const mimetypes = headers['accept'].split(',');
          if (mimetypes.includes('text/html')) {
            postToStats('show', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
            res.status(200).render('showLite', { fileInfo });
          } else {
            postToStats('serve', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
            serveFile(fileInfo, res);
          }
        } else {
          postToStats('serve', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
          serveFile(fileInfo, res);
        }
      })
      .catch(error => {
        errorHandlers.handleRequestError('serve', originalUrl, ip, error, res);
      });
  });
};
