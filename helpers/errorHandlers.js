const logger = require('winston');
const { postToStats } = require('../controllers/statsController.js');

module.exports = {
  handleRequestError (action, originalUrl, ip, error, res) {
    logger.error(`Request Error: ${originalUrl}`, module.exports.useObjectPropertiesIfNoKeys(error));
    postToStats(action, originalUrl, ip, null, null, error);
    if (error.response) {
      res.status(error.response.status).send(error.response.data.error.message);
    } else if (error.code === 'ECONNREFUSED') {
      res.status(503).send('Connection refused.  The daemon may not be running.');
    } else if (error.message) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send(error);
    }
  },
  handlePublishError (error) {
    logger.error('Publish Error:', module.exports.useObjectPropertiesIfNoKeys(error));
    if (error.code === 'ECONNREFUSED') {
      return 'Connection refused.  The daemon may not be running.';
    } else if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          return error.response.data.message;
        } else if (error.response.data.error) {
          return error.response.data.error.message;
        }
        return error.response.data;
      }
      return error.response;
    } else {
      return error;
    }
  },
  useObjectPropertiesIfNoKeys (err) {
    if (Object.keys(err).length === 0) {
      let newErrorObject = {};
      Object.getOwnPropertyNames(err).forEach((key) => {
        newErrorObject[key] = err[key];
      });
      return newErrorObject;
    }
    return err;
  },
};
