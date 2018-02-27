const handlePageRender = require('../helpers/handlePageRender.jsx');

module.exports = app => {
  // a catch-all route if someone visits a page that does not exist
  app.use('*', (req, res) => {
    // send response
    handlePageRender(req, res);
  });
};
