const handleShowRender = require('../../render/build/handleShowRender.js');

const sendReactApp = (req, res) => {
  handleShowRender(req, res);
};

module.exports = sendReactApp;
