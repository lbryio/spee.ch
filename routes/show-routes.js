const logger = require('winston');
const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const showController = require('../controllers/showController.js');
const { postToStats, sendGoogleAnalytics } = require('../helpers/libraries/statsController.js');
const statsController = require('../controllers/statsController.js');

function sendAnalyticsAndLog (ip, originalUrl) {
  // google analytics
  sendGoogleAnalytics('show', ip, originalUrl);
  // logging
  logger.verbose(`POST request on ${originalUrl} from ${ip}`);
  // get and serve the content
}

module.exports = (app) => {
  // route to show the meme-fodder meme maker
  app.get('/meme-fodder/play', ({ ip, originalUrl }, res) => {
    sendAnalyticsAndLog(ip, originalUrl);
    // get and render the content
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
  app.get('/stats', ({ ip, originalUrl }, res) => {
    sendAnalyticsAndLog(ip, originalUrl);
    // get and render the content
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
  app.get('/:name/all', ({ ip, originalUrl, params }, res) => {
    sendAnalyticsAndLog(ip, originalUrl);
    // get and render the content
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
