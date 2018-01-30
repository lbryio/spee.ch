const errorHandlers = require('../helpers/errorHandlers.js');
const { getTrendingClaims, getRecentClaims } = require('../controllers/statsController.js');
const { site } = require('../config/speechConfig.js');

module.exports = (app) => {
  // route to log out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  // route to display login page
  app.get('/login', (req, res) => {
    res.status(200).render('index');
  });
  // route to show 'about' page
  app.get('/about', (req, res) => {
    res.status(200).render('index');
  });
  // route to display a list of the trending images
  app.get('/trending', (req, res) => {
    res.status(301).redirect('/popular');
  });
  app.get('/popular', ({ ip, originalUrl }, res) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    const dateTime = startDate.toISOString().slice(0, 19).replace('T', ' ');
    getTrendingClaims(dateTime)
      .then(result => {
        res.status(200).render('popular', {
          trendingAssets: result,
        });
      })
      .catch(error => {
        errorHandlers.handleRequestError(originalUrl, ip, error, res);
      });
  });
  // route to display a list of the trending images
  app.get('/new', ({ ip, originalUrl }, res) => {
    getRecentClaims()
      .then(result => {
        res.status(200).render('new', { newClaims: result });
      })
      .catch(error => {
        errorHandlers.handleRequestError(originalUrl, ip, error, res);
      });
  });
  // route to send embedable video player (for twitter)
  app.get('/embed/:claimId/:name', ({ params }, res) => {
    const claimId = params.claimId;
    const name = params.name;
    const host = site.host;
    // get and render the content
    res.status(200).render('embed', { layout: 'embed', host, claimId, name });
  });
  // route to display all free public claims at a given name
  app.get('/:name/all', (req, res) => {
    // get and render the content
    res.status(410).send('/:name/all is no longer supported');
  });
};
