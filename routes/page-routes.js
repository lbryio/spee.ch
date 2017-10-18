const errorHandlers = require('../helpers/errorHandlers.js');
const { postToStats, getStatsSummary, getTrendingClaims, getRecentClaims } = require('../controllers/statsController.js');

module.exports = (app) => {
  // route to log out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  // route to display login page
  app.get('/login', (req, res) => {
    if (req.user) {
      res.status(200).redirect(`/${req.user.channelName}`);
    } else {
      res.status(200).render('login');
    }
  });
  // route to show 'about' page for spee.ch
  app.get('/about', (req, res) => {
    // get and render the content
    res.status(200).render('about');
  });
  // route to display a list of the trending images
  app.get('/trending', (req, res) => {
    res.status(301).redirect('/popular');
  });
  app.get('/popular', (req, res) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    const dateTime = startDate.toISOString().slice(0, 19).replace('T', ' ');
    getTrendingClaims(dateTime)
      .then(result => {
        // logger.debug(result);
        res.status(200).render('popular', {
          trendingAssets: result,
        });
      })
      .catch(error => {
        errorHandlers.handleRequestError(null, null, null, error, res);
      });
  });
  // route to display a list of the trending images
  app.get('/new', (req, res) => {
    getRecentClaims()
      .then(result => {
        // logger.debug(result);
        res.status(200).render('new', {
          newClaims: result,
        });
      })
      .catch(error => {
        errorHandlers.handleRequestError(null, null, null, error, res);
      });
  });
  // route to show statistics for spee.ch
  app.get('/stats', ({ ip, originalUrl, user }, res) => {
    // get and render the content
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    getStatsSummary(startDate)
      .then(result => {
        postToStats('show', originalUrl, ip, null, null, 'success');
        res.status(200).render('statistics', {
          user,
          result,
        });
      })
      .catch(error => {
        errorHandlers.handleRequestError(null, null, null, error, res);
      });
  });
  // route to send embedable video player (for twitter)
  app.get('/embed/:claimId/:name', ({ params }, res) => {
    const claimId = params.claimId;
    const name = params.name;
    console.log('claimId ==', claimId);
    console.log('name ==', name);
    // get and render the content
    res.status(200).render('embed', { layout: 'embed', claimId, name });
  });
  // route to display all free public claims at a given name
  app.get('/:name/all', (req, res) => {
    // get and render the content
    res.status(410).send('/:name/all is no longer supported');
  });
};
