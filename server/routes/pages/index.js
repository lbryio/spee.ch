const handlePageRequest = require('../../controllers/pages/sendReactApp');
const handleVideoEmbedRequest = require('../../controllers/pages/sendVideoEmbedPage');
const redirect = require('../../controllers/utils/redirect');

module.exports = {
  '/': { controller: handlePageRequest },
  '/login': { controller: handlePageRequest },
  '/about': { controller: handlePageRequest },
  '/trending': { controller: redirect('/popular') },
  '/popular': { controller: handlePageRequest },
  '/new': { controller: handlePageRequest },
  '/multisite': { controller: handlePageRequest },
  '/video-embed/:name/:claimId': { controller: handleVideoEmbedRequest },  // for twitter
};
