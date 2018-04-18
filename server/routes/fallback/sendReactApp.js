const handlePageRender = require('../../render/build/handlePageRender.js');

const sendReactApp = (req, res) => {
  handlePageRender(req, res);
};

module.exports = sendReactApp;
