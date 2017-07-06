const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const { getClaimByClaimId, getClaimByName, getAllClaims } = require('../controllers/serveController.js');
const { getStatsSummary, postToStats } = require('../controllers/statsController.js');

module.exports = (app) => {
  // route to show 'about' page for spee.ch
  app.get('/about', ({ ip, originalUrl }, res) => {
    // get and render the content
    res.status(200).render('about');
  });
  // route to show the meme-fodder meme maker
  app.get('/meme-fodder/play', ({ ip, originalUrl }, res) => {
    // get and render the content
    getAllClaims('meme-fodder')
      .then(orderedFreePublicClaims => {
        postToStats('show', originalUrl, ip, 'success');
        res.status(200).render('memeFodder', { claims: orderedFreePublicClaims });
      })
      .catch(error => {
        errorHandlers.handleRequestError('show', originalUrl, ip, error, res);
      });
  });
  // route to show statistics for spee.ch
  app.get('/stats', ({ ip, originalUrl }, res) => {
    // get and render the content
    getStatsSummary()
      .then(result => {
        postToStats('show', originalUrl, ip, 'success');
        res.status(200).render('statistics', result);
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
  // route to display all free public claims at a given name
  app.get('/:name/all', ({ ip, originalUrl, params }, res) => {
    // get and render the content
    getAllClaims(params.name)
      .then(orderedFreePublicClaims => {
        if (!orderedFreePublicClaims) {
          res.status(307).render('noClaims');
          return;
        }
        postToStats('show', originalUrl, ip, 'success');
        res.status(200).render('allClaims', { claims: orderedFreePublicClaims });
      })
      .catch(error => {
        errorHandlers.handleRequestError('show', originalUrl, ip, error, res);
      });
  });
  // route to show a specific asset
  app.get('/s/:name/:claim_id', ({ ip, originalUrl, params }, res) => {
    // begin image-serve processes
    getClaimByClaimId(params.name, params.claim_id)
      .then(fileInfo => {
        // check to make sure a file was found
        if (!fileInfo) {
          res.status(307).render('noClaims');
          return;
        }
        // serve the file or the show route
        postToStats('show', originalUrl, ip, 'success');
        res.status(200).render('show', { fileInfo });
      })
      .catch(error => {
        errorHandlers.handleRequestError('serve', originalUrl, ip, error, res);
      });
  });
  // route to show the winning free, public claim
  app.get('/s/:name', ({ ip, originalUrl, params }, res) => {
    // get and render the content
    getClaimByName(params.name)
      .then(fileInfo => {
        // check to make sure a file was found
        if (!fileInfo) {
          res.status(307).render('noClaims');
          return;
        }
        // serve the show route
        postToStats('show', originalUrl, ip, 'success');
        res.status(200).render('show', { fileInfo });
      })
      .catch(error => {
        errorHandlers.handleRequestError('serve', originalUrl, ip, error, res);
      });
  });
};
