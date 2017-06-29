const logger = require('winston');
const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const showController = require('../controllers/showController.js');
const { postToStats } = require('../helpers/libraries/statsHelpers.js');
const statsController = require('../controllers/statsController.js');

module.exports = (app) => {
  // route to show the meme-fodder meme maker
  app.get('/meme-fodder/play', ({ originalUrl, ip }, res) => {
    logger.verbose(`POST request on ${originalUrl} from ${ip}`);
    // get and serve the content
    showController
      .getAllClaims('meme-fodder')
      .then(orderedFreePublicClaims => {
        postToStats('show', originalUrl, ip, 'success');
        res.status(200).render('memeFodder', { claims: orderedFreePublicClaims });
      })
      .catch(error => {
        errorHandlers.handleRequestError('show', originalUrl, ip, error, res);
      });
  });
  // route to show statistics for spee.ch
  app.get('/stats', ({ originalUrl, ip }, res) => {
    logger.verbose(`POST request on ${originalUrl} from ${ip}`);
    // get and serve the content
    statsController
      .getStatsSummary()
      .then(result => {
        postToStats('show', originalUrl, ip, 'success');
        res.status(200).render('statistics', result);
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
  // route to display all free public claims at a given name
  app.get('/:name/all', ({ originalUrl, params, ip }, res) => {
    logger.verbose(`POST request on ${originalUrl} from ${ip}`);
    // get and serve the content
    showController
      .getAllClaims(params.name)
      .then(orderedFreePublicClaims => {
        postToStats('show', originalUrl, ip, 'success');
        res.status(200).render('allClaims', { claims: orderedFreePublicClaims });
      })
      .catch(error => {
        errorHandlers.handleRequestError('show', originalUrl, ip, error, res);
      });
  });
};
