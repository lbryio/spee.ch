const { postToStats, getTrendingClaims } = require('../controllers/statsController.js');
const errorHandlers = require('../helpers/libraries/errorHandlers.js');

module.exports = app => {
  // route for the home page
  app.get('/', ({ headers, ip, originalUrl }, res) => {
    // get yesterday's date
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    // send response
    getTrendingClaims(startDate)
      .then(result => {
        res.status(200).render('index', { trendingAssets: result });
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
  // a catch-all route if someone visits a page that does not exist
  app.use('*', ({ originalUrl, ip }, res) => {
    // post to stats
    postToStats('show', originalUrl, ip, null, null, 'Error: 404');
    // send response
    res.status(404).render('fourOhFour');
  });
};
