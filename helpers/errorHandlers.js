const logger = require('winston');
const { postToStats } = require('../controllers/statsController.js');

module.exports = {
  handleRequestError (action, originalUrl, ip, error, res) {
    logger.error(`Request Error >> ${error.message}`, error);
    if (error.response) {
      postToStats(action, originalUrl, ip, null, null, error.response.data.error.messsage);
      res.status(error.response.status).send(error.response.data.error.message);
    } else if (error.code === 'ECONNREFUSED') {
      postToStats(action, originalUrl, ip, null, null, 'Connection refused.  The daemon may not be running.');
      res.status(503).send('Connection refused.  The daemon may not be running.');
    } else if (error.message) {
      postToStats(action, originalUrl, ip, null, null, error);
      res.status(400).send(error.message);
    } else {
      postToStats(action, originalUrl, ip, null, null, error);
      res.status(400).send(error);
    }
  },
  handlePublishError (error) {
    logger.error(`Publish Error >> ${error.message}`, error);
    if (error.code === 'ECONNREFUSED') {
      return 'Connection refused.  The daemon may not be running.';
    } else if (error.response.data.error) {
      return error.response.data.error.message;
    } else {
      return error;
    }
  },
};
