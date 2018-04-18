const handlePageRender = require('../../render/handlePageRender.js');

const sendReactApp = (req, res) => {
  handlePageRender(req, res);
};

module.exports = sendReactApp;
