const handlePageRequest = require('../../controllers/pages/sendReactApp');

module.exports = (app) => {
  app.get('*', handlePageRequest);
};
