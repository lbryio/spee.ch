const logger = require('winston');
const { postToAnalytics } = require('./analytics');

module.exports = {
  handleRequestError (action, originalUrl, ip, error, res) {
    logger.error('Request Error >>', error);
    if (error === 'NO_CLAIMS' || error === 'NO_FREE_PUBLIC_CLAIMS') {
      postToAnalytics(action, originalUrl, ip, 'success');
      res.status(307).render('noClaims');
    } else if (error.response) {
      postToAnalytics(action, originalUrl, ip, 'error.response.data.error.messsage');
      res.status(error.response.status).send(error.response.data.error.message);
    } else if (error.code === 'ECONNREFUSED') {
      postToAnalytics(action, originalUrl, ip, 'Connection refused.  The daemon may not be running.');
      res.status(503).send('Connection refused.  The daemon may not be running.');
    } else {
      postToAnalytics(action, originalUrl, ip, error);
      res.status(400).send(JSON.stringify(error));
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
      logger.error('Unhandled Publish Error:', error);
      return error;
    }
  },
};
