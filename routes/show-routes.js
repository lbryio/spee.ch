const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const showController = require('../controllers/showController.js');
const logger = require('winston');
const postToAnalytics = require('../helpers/libraries/analytics');

module.exports = (app) => {
  // route to fetch all free public claims
  app.get('/meme-fodder/play', ({ originalUrl, ip }, res) => {
    logger.debug(`GET request on ${originalUrl} from ${ip}`);
    // get and serve content
    showController
      .getAllClaims('meme-fodder')
      .then(orderedFreePublicClaims => {
        postToAnalytics('show', originalUrl, ip, 'success');
        res.status(200).render('memeFodder', { claims: orderedFreePublicClaims });
      })
      .catch(error => {
        errorHandlers.handleRequestError('show', originalUrl, ip, error, res);
      });
  });
  // route to fetch all free public claims
  app.get('/:name/all', ({ originalUrl, params, ip }, res) => {
    logger.debug(`GET request on ${originalUrl} from ${ip}`);
    // get and serve content
    showController
      .getAllClaims(params.name)
      .then(orderedFreePublicClaims => {
        postToAnalytics('show', originalUrl, ip, 'success');
        res.status(200).render('allClaims', { claims: orderedFreePublicClaims });
      })
      .catch(error => {
        errorHandlers.handleRequestError('show', originalUrl, ip, error, res);
      });
  });
};
