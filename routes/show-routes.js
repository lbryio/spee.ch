const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const showController = require('../controllers/showController.js');
const logger = require('winston');

module.exports = (app, ua, googleAnalyticsId) => {
  // route to fetch all free public claims
  app.get('/:name/all', ({ originalUrl, params }, res) => {
    logger.debug(`Get request on ${originalUrl}`);
    // google analytics
    ua(googleAnalyticsId, { https: true }).event('Show Routes', '/name/all', `${params.name}/all`).send();
    // fetch all free public claims
    showController
      .getAllClaims(params.name)
      .then(orderedFreePublicClaims => {
        logger.info(`${originalUrl} returned successfully.`);
        res.status(200).render('allClaims', { claims: orderedFreePublicClaims });
      })
      .catch(error => {
        logger.error(`${originalUrl} returned an error.`, error);
        errorHandlers.handleRequestError(error, res);
      });
  });
};
