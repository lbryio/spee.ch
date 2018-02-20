const { site } = require('../config/speechConfig.js');

module.exports = (app) => {
  // route for the home page
  app.get('/', (req, res) => {
    console.log('rendering homepage');
    res.status(200).render('index');
  });
  // route to display login page
  app.get('/login', (req, res) => {
    console.log('rendering login page');
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
    res.status(200).render('index');
  });
  // route to display a list of the trending images
  app.get('/new', ({ ip, originalUrl }, res) => {
    res.status(200).render('index');
  });
  // route to send embedable video player (for twitter)
  app.get('/embed/:claimId/:name', ({ params }, res) => {
    const claimId = params.claimId;
    const name = params.name;
    const host = site.host;
    // get and render the content
    res.status(200).render('embed', { layout: 'embed', host, claimId, name });
  });
};
