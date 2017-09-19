const errorHandlers = require('../helpers/errorHandlers.js');
const { postToStats, getStatsSummary, getTrendingClaims, getRecentClaims } = require('../controllers/statsController.js');
const passport = require('passport');
const logger = require('winston');

module.exports = (app) => {
  // route for auth
  app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    logger.debug('redirecting to user channel');
    // If this function gets called, signup was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/@' + req.user.channelName);
  });
  app.post('/login', passport.authenticate('local-login'), (req, res) => {
    logger.debug('redirecting to user channel');
    // If this function gets called, login was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/@' + req.user.channelName);
  });
  // route to log out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  // route to display login page
  app.get('/login', (req, res) => {
    if (req.user) {
      res.status(200).redirect(`/@${req.user.channelName}`);
    } else {
      res.status(200).render('login');
    }
  });
  // route to display login page
  // app.get('/users/:name', isAuthenticated, (req, res) => {
  //   res.status(200).render('profile');
  // });
  // app.get('/logout', deAuthenticate, (req, res) => {
  //   res.status(200).render('/');
  // });

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
        res.status(200).render('trending', {
          trendingAssets: result,
        });
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
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
        errorHandlers.handleRequestError(error, res);
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
        errorHandlers.handleRequestError(error, res);
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
