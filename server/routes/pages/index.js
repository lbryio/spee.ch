const handlePageRequest = require('./sendReactApp');
const handleEmbedRequest = require('./sendEmbedPage');
const redirect = require('./redirect');

module.exports = (app) => {
  app.get('/', handlePageRequest);
  app.get('/login', handlePageRequest);
  app.get('/about', handlePageRequest);
  app.get('/trending', redirect('/popular'));
  app.get('/popular', handlePageRequest);
  app.get('/new', handlePageRequest);
  app.get('/embed/:claimId/:name', handleEmbedRequest);  // route to send embedable video player (for twitter)
};
