const errorHandlers = require('../helpers/libraries/errorHandlers.js');
const analyticsController = require('../controllers/analyticsController.js');

module.exports = (app) => {
  // route to show analytics
  app.get('/analytics', (req, res) => {
    // get and serve content
    analyticsController
      .getAnalyticsSummary()
      .then(result => {
        res.status(200).render('analytics', result);
      })
      .catch(error => {
        errorHandlers.handleRequestError(error, res);
      });
  });
};
