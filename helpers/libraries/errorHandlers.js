const logger = require('winston');
const { postToStats } = require('../../controllers/statsController.js');

module.exports = {
  handleRequestError (action, originalUrl, ip, error, res) {
    logger.error('Request Error >>', error);
    if (error.response) {
      postToStats(action, originalUrl, ip, null, null, null, null, null, error.response.data.error.messsage);
      res.status(error.response.status).send(error.response.data.error.message);
    } else if (error.code === 'ECONNREFUSED') {
      postToStats(action, originalUrl, ip, null, null, null, null, null, 'Connection refused.  The daemon may not be running.');
      res.status(503).send('Connection refused.  The daemon may not be running.');
    } else if (error.message) {
      postToStats(action, originalUrl, ip, null, null, null, null, null, error);
      res.status(400).send(error.message);
    } else {
      postToStats(action, originalUrl, ip, null, null, null, null, null, error);
      res.status(400).send(error);
    }
  },
  handlePublishError (error) {
    if (error.code === 'ECONNREFUSED') {
      logger.error('Publish Error:', 'Connection refused.  The daemon may not be running.');
      return 'Connection refused.  The daemon may not be running.';
    } else if (error.response.data.error) {
      logger.error('Publish Error:', error.response.data.error);
      return error.response.data.error.message;
    } else {
      logger.error('Unhandled Publish Error:', error.message);
      return error;
    }
  },
};
