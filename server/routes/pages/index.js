const handlePageRequest = require('../../controllers/pages/sendReactApp');
const handleVideoEmbedRequest = require('../../controllers/pages/sendVideoEmbedPage');
const redirect = require('../../controllers/utils/redirect');

// TODO: Adjust build & sources to use import/export everywhere
const Actions = require('@actions').default;
const Sagas = require('@sagas').default;

module.exports = {
  '/': { controller: handlePageRequest, action: Actions.onHandleShowHomepage, saga: Sagas.handleShowHomepage  },
  '/login': { controller: handlePageRequest },
  '/about': { controller: handlePageRequest },
  '/tos': { controller: handlePageRequest },
  '/faq': { controller: handlePageRequest },
  '/trending': { controller: redirect('/popular') },
  '/popular': { controller: handlePageRequest },
  '/new': { controller: handlePageRequest },
  '/edit/:claimId': { controller: handlePageRequest },
  '/multisite': { controller: handlePageRequest },
  '/video-embed/:name/:claimId/:config?': { controller: handleVideoEmbedRequest },  // for twitter
};
