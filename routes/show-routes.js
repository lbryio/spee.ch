const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const { showClaimByName, showClaimByClaimId, showClaimByShortUrl, showAllClaims } = require('../controllers/showController.js');
const { postToStats, getStatsSummary, getTrendingClaims } = require('../controllers/statsController.js');

function retrieveAssetInfo (name, claimId) {
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
  // route to show 'about' page for spee.ch
  app.get('/about', ({ ip, originalUrl }, res) => {
    // get and render the content
    res.status(200).render('about');
  });
  // route to display a list of the trending images
  app.get('/trending', ({ params, headers }, res) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    getTrendingClaims(startDate)
      .then(result => {
        // logger.debug(result);
        res.status(200).render('trending', { trendingAssets: result });
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
  // route to show statistics for spee.ch
  app.get('/stats', ({ ip, originalUrl }, res) => {
    // get and render the content
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    getStatsSummary(startDate)
      .then(result => {
        postToStats('show', originalUrl, ip, null, null, 'success');
        res.status(200).render('statistics', result);
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
  // route to display all free public claims at a given name
  app.get('/:name/all', ({ ip, originalUrl, params }, res) => {
    // get and render the content
    showAllClaims(params.name)
      .then(orderedFreePublicClaims => {
        if (!orderedFreePublicClaims) {
          res.status(307).render('noClaims');
          return;
        }
        postToStats('show', originalUrl, ip, null, null, 'success');
        res.status(200).render('allClaims', { claims: orderedFreePublicClaims });
      })
      .catch(error => {
        errorHandlers.handleRequestError('show', originalUrl, ip, error, res);
      });
  });
  // route to show a specific asset
  app.get('/show/:name/:claim_id', ({ ip, originalUrl, params }, res) => {
    // begin image-serve processes
    retrieveAssetInfo(params.name, params.claim_id)
      .then((fileInfo) => {
        console.log('SHORT URL:', fileInfo.shortUrl);
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
  });
  // route to show the winning free, public claim
  app.get('/show/:name', ({ ip, originalUrl, params }, res) => {
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
  });
};
