const { details: host } = require('../config/siteConfig.js');
const handlePageRender = require('../helpers/handlePageRender.jsx');

module.exports = (app) => {
  // route for the home page
  app.get('/', (req, res) => {
    handlePageRender(req, res);
  });
  // route to display login page
  app.get('/login', (req, res) => {
    handlePageRender(req, res);
  });
  // route to show 'about' page
  app.get('/about', (req, res) => {
    handlePageRender(req, res);
  });
  // route to display a list of the trending images
  app.get('/trending', (req, res) => {
    res.status(301).redirect('/popular');
  });
  app.get('/popular', (req, res) => {
    handlePageRender(req, res);
  });
  // route to display a list of the trending images
  app.get('/new', (req, res) => {
    handlePageRender(req, res);
  });
  // route to send embedable video player (for twitter)
  app.get('/embed/:claimId/:name', ({ params }, res) => {
    const claimId = params.claimId;
    const name = params.name;
    // get and render the content
    res.status(200).render('embed', { layout: 'embed', host, claimId, name });
  });
};
