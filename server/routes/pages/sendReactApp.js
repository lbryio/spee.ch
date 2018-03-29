const handlePageRender = require('helpers/handlePageRender.jsx');

const sendReactApp = () => {
  return (req, res) => {
    handlePageRender(req, res);
  };
};

module.exports = sendReactApp;
