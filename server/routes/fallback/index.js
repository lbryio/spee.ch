const handlePageRequest = require('./sendReactApp');

module.exports = (app) => {
  app.get('*', handlePageRequest);
};
