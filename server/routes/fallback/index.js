const handlePageRequest = require('../../controllers/fallback/sendReactApp');

module.exports = (app) => {
  app.get('*', handlePageRequest);
};
