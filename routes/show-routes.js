const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const showController = require('../controllers/showController.js');
const logger = require('winston');
const { postShowAnalytics } = require('../helpers/libraries/analytics');

module.exports = (app, ua, googleAnalyticsId) => {
  // route to fetch all free public claims
  app.get('/meme-fodder/play', ({ originalUrl, ip }, res) => {
    logger.debug(`GET request on ${originalUrl} from ${ip}`);
    // get and serve content
    showController
      .getAllClaims('meme-fodder')
      .then(orderedFreePublicClaims => {
        postShowAnalytics(originalUrl, ip, 'success');
        res.status(200).render('memeFodder', { claims: orderedFreePublicClaims });
      })
      .catch(error => {
        postShowAnalytics(originalUrl, ip, error);
        errorHandlers.handleRequestError(error, res);
      });
  });
  // route to fetch all free public claims
  app.get('/:name/all', ({ originalUrl, params, ip }, res) => {
    logger.debug(`GET request on ${originalUrl} from ${ip}`);
    // get and serve content
    showController
      .getAllClaims(params.name)
      .then(orderedFreePublicClaims => {
        postShowAnalytics(originalUrl, ip, 'success');
        res.status(200).render('allClaims', { claims: orderedFreePublicClaims });
      })
      .catch(error => {
        postShowAnalytics(originalUrl, ip, error);
        errorHandlers.handleRequestError(error, res);
      });
  });
};
