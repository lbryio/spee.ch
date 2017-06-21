const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const showController = require('../controllers/showController.js');
const logger = require('winston');

module.exports = (app, ua, googleAnalyticsId) => {
  // route to fetch all free public claims
  app.get('/meme-fodder/play', ({ originalUrl }, res) => {
    // google analytics
    logger.debug(`GET request on ${originalUrl}`);
    // get and serve content
    showController
      .getAllClaims('meme-fodder-entry')
      .then(orderedFreePublicClaims => {
        res.status(200).render('memeFodder', { claims: orderedFreePublicClaims });
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
  // route to fetch all free public claims
  app.get('/:name/all', ({ originalUrl, params }, res) => {
    logger.debug(`GET request on ${originalUrl}`);
    // google analytics
    ua(googleAnalyticsId, { https: true }).event('Show Routes', '/name/all', `${params.name}/all`).send();
    // get and serve content
    showController
      .getAllClaims(params.name)
      .then(orderedFreePublicClaims => {
        res.status(200).render('allClaims', { claims: orderedFreePublicClaims });
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
};
