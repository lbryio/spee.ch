const handlePageRequest = require('../../controllers/pages/sendReactApp');
const handleVideoEmbedRequest = require('../../controllers/pages/sendVideoEmbedPage');
const redirect = require('../../controllers/utils/redirect');

module.exports = (app) => {
  app.get('/', handlePageRequest);
  app.get('/login', handlePageRequest);
  app.get('/about', handlePageRequest);
  app.get('/tos', handlePageRequest);
  app.get('/trending', redirect('/popular'));
  app.get('/popular', handlePageRequest);
  app.get('/new', handlePageRequest);
  app.get('/multisite', handlePageRequest);
  app.get('/video-embed/:name/:claimId', handleVideoEmbedRequest);  // for twitter
};
