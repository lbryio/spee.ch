const logger = require('winston');
const { postToStats } = require('../controllers/statsController.js');

module.exports = app => {
  // route for the home page
  app.get('/', ({ headers, ip, originalUrl }, res) => {
    // send response
    res.status(200).render('index');
  });
  // a catch-all route if someone visits a page that does not exist
  app.use('*', ({ originalUrl, ip }, res) => {
    logger.error(`404 on ${originalUrl}`);
    // post to stats
    postToStats('show', originalUrl, ip, null, null, null, null, null, 'Error: 404');
    // send response
    res.status(404).render('fourOhFour');
  });
};
