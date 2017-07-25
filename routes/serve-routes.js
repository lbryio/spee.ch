const { serveClaimByName, serveClaimByClaimId, serveClaimByShortUrl } = require('../controllers/serveController.js');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');
const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const { serveFile } = require('../helpers/libraries/serveHelpers.js');
const { showClaimByName, showClaimByClaimId, showClaimByShortUrl } = require('../controllers/showController.js');
const logger = require('winston');

function retrieveAssetServeInfo (name, claimId) {
  const deferred = new Promise((resolve, reject) => {
    // if claim id is full 40 chars, retrieve the shortest possible url
    if (claimId.length === 40) {
      resolve(serveClaimByClaimId(name, claimId));
    // if the claim id is shorter than 40, retrieve the full claim id & shortest possible url
    } else if (claimId.length < 40) {
      resolve(serveClaimByShortUrl(name, claimId));
    } else {
      reject(new Error('That Claim Id is longer than 40 characters.'));
    }
  });
  return deferred;
}

function retrieveAssetShowInfo (name, claimId) {
  const deferred = new Promise((resolve, reject) => {
    // if claim id is full 40 chars, retrieve the shortest possible url
    if (claimId.length === 40) {
      resolve(showClaimByClaimId(name, claimId));
    // if the claim id is shorter than 40, retrieve the full claim id & shortest possible url
    } else if (claimId.length < 40) {
      resolve(showClaimByShortUrl(name, claimId));
    } else {
      reject(new Error('That Claim Id is longer than 40 characters.'));
    }
  });
  return deferred;
}

module.exports = (app) => {
  // route to serve a specific asset
  app.get('/:name/:claim_id', ({ headers, ip, originalUrl, params }, res) => {
    // decide to serve or show
    const dotIndex = params.claim_id.lastIndexOf('.');
    if (dotIndex === 0) {
      logger.error('a file extension with no name was submitted');
      errorHandlers.handleRequestError('serve', originalUrl, ip, new Error('no claim id provided'), res);
    // if an image extension was given, serve the image directly
    } else if (dotIndex > 0) {
      // google analytics
      sendGoogleAnalytics('serve', headers, ip, originalUrl);
      const fileExtension = params.claim_id.substring(dotIndex);
      const claimId = params.claim_id.substring(0, dotIndex);
      logger.debug('file extension is:', fileExtension);
      // begin image-serve processes
      retrieveAssetServeInfo(params.name, claimId)
        .then((fileInfo) => {
          // check to make sure a file was found
          if (!fileInfo) {
            res.status(307).render('noClaims');
            return;
          }
          // serve the file or the show route
          if (headers['accept']) {
            const mimetypes = headers['accept'].split(',');
            if (mimetypes.includes('text/html')) {
              postToStats('show', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
              res.status(200).render('showLite', { layout: 'show', fileInfo });
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
    // if no image extension was given, show the asset with details
    } else if (dotIndex === -1) {
      // google analytics
      sendGoogleAnalytics('show', headers, ip, originalUrl);
      // begin image-show processes
      retrieveAssetShowInfo(params.name, params.claim_id)
        .then((fileInfo) => {
          // check to make sure a file was found
          if (!fileInfo) {
            res.status(307).render('noClaims');
            return;
          }
          // serve the file or the show route
          postToStats('show', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
          res.status(200).render('show', { layout: 'show', fileInfo });
        })
        .catch(error => {
          errorHandlers.handleRequestError('show', originalUrl, ip, error, res);
        });
    }
  });
  // route to serve the winning asset at a claim
  app.get('/:name', ({ headers, ip, originalUrl, params }, res) => {
    // decide to serve or show
    const dotIndex = params.name.lastIndexOf('.');
    if (dotIndex === 0) {
      logger.error('a file extension with no name was submitted');
      errorHandlers.handleRequestError('serve', originalUrl, ip, new Error('no name provided'), res);
    // if an image extension was given, serve the image directly
    } else if (dotIndex > 0) {
      // google analytics
      sendGoogleAnalytics('serve', headers, ip, originalUrl);
      const fileExtension = params.name.substring(dotIndex);
      const claimName = params.name.substring(0, dotIndex);
      logger.debug('file extension is:', fileExtension);
      // begin image-serve processes
      serveClaimByName(claimName)
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
              res.status(200).render('showLite', { layout: 'show', fileInfo });
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
    // if no image extension was given, show the asset with details
    } else if (dotIndex === -1) {
      // google analytics
      sendGoogleAnalytics('show', headers, ip, originalUrl);
      // get and render the content
      showClaimByName(params.name)
        .then(fileInfo => {
          // check to make sure a file was found
          if (!fileInfo) {
            res.status(307).render('noClaims');
            return;
          }
          // serve the show route
          postToStats('show', originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
          res.status(200).render('show', { layout: 'show', fileInfo });
        })
        .catch(error => {
          errorHandlers.handleRequestError('show', originalUrl, ip, error, res);
        });
    }
  });
};
