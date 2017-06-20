const logger = require('winston');

module.exports = {
  handleRequestError (error, res) {
    logger.error('Handling Request Error:', error);
    if (error === 'NO_CLAIMS' || error === 'NO_FREE_PUBLIC_CLAIMS') {
      res.status(307).render('noClaims');
    } else if (error.response) {
      res.status(error.response.status).send(error.response.data.error.message);
    } else if (error.code === 'ECONNREFUSED') {
      res.status(400).send('Connection refused.  The daemon may not be running.');
    } else {
      res.status(400).send(error.toString());
    }
  },
  handlePublishError (error) {
    logger.error('Handling Publish Error:', error);
    if (error.code === 'ECONNREFUSED') {
      return 'Connection refused.  The daemon may not be running.';
    } else if (error.response.data.error) {
      return error.response.data.error;
    } else {
      return error;
    }
  },
};
