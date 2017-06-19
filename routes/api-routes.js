const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const lbryApi = require('../helpers/libraries/lbryApi.js');
const logger = require('winston');

module.exports = app => {
  // route to run a claim_list request on the daemon
  app.get('/api/claim_list/:claim', ({ originalUrl, params }, res) => {
    logger.info(`GET request on ${originalUrl}`);
    lbryApi
      .getClaimsList(params.claim)
      .then(claimsList => {
        res.status(200).json(claimsList);
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
  // route to run a resolve request on the daemon
  app.get('/api/resolve/:uri', ({ originalUrl, params }, res) => {
    logger.info(`GET request on ${originalUrl}`);
    lbryApi
      .resolveUri(params.uri)
      .then(resolvedUri => {
        res.status(200).json(resolvedUri);
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
};
