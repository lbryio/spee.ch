const logger = require('winston');
const { postToStats } = require('../controllers/statsController.js');

function useObjectPropertiesIfNoKeys (err) {
  if (Object.keys(err).length === 0) {
    let newErrorObject = {};
    Object.getOwnPropertyNames(err).forEach((key) => {
      newErrorObject[key] = err[key];
    });
    return newErrorObject;
  }
  return err;
}

module.exports = {
  handleRequestError (action, originalUrl, ip, error, res) {
    logger.error('Request Error:', useObjectPropertiesIfNoKeys(error));
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
    logger.error('Publish Error:', useObjectPropertiesIfNoKeys(error));
    if (error.code === 'ECONNREFUSED') {
      return 'Connection refused.  The daemon may not be running.';
    } else if (error.response.data.error) {
      return error.response.data.error.message;
    } else {
      return error;
    }
  },
};
