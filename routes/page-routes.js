const errorHandlers = require('../helpers/errorHandlers.js');
const { getAllFreeClaims } = require('../helpers/serveHelpers.js');
const { postToStats, getStatsSummary, getTrendingClaims, getRecentClaims } = require('../controllers/statsController.js');

module.exports = (app) => {
  // route to show 'about' page for spee.ch
  app.get('/about', ({ ip, originalUrl }, res) => {
    // get and render the content
    res.status(200).render('about');
  });
  // route to display a list of the trending images
  app.get('/popular', ({ params, headers }, res) => {
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
  // route to display a list of the trending images
  app.get('/new', ({ params, headers }, res) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    getRecentClaims(startDate)
      .then(result => {
        // logger.debug(result);
        res.status(200).render('new', { newClaims: result });
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
  app.get('/embed/:claimId/:name', ({ params }, res) => {
    const claimId = params.claimId;
    const name = params.name;
    const dummyParam = '.b';
    console.log('claimId ==', claimId);
    console.log('name ==', name);
    // get and render the content
    res.status(200).render('embed', { layout: 'embed', claimId, name, dummyParam });
  });
  // route to display all free public claims at a given name
  app.get('/:name/all', ({ ip, originalUrl, params }, res) => {
    // get and render the content
    getAllFreeClaims(params.name)
      .then(orderedFreeClaims => {
        if (!orderedFreeClaims) {
          res.status(307).render('noClaims');
          return;
        }
        postToStats('show', originalUrl, ip, null, null, 'success');
        res.status(200).render('allClaims', { claims: orderedFreeClaims });
      })
      .catch(error => {
        errorHandlers.handleRequestError('show', originalUrl, ip, error, res);
      });
  });
};
