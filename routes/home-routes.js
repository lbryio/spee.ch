const logger = require('winston');
const { postToStats } = require('../controllers/statsController.js');

module.exports = app => {
  // route for the home page
  app.get('/', ({ headers, ip, originalUrl }, res) => {
    // logging
    logger.verbose(`GET request on ${originalUrl} from ${ip}`);
    // send response
    res.status(200).render('index');
  });
  // a catch-all route if someone visits a page that does not exist
  app.use('*', ({ originalUrl, ip }, res) => {
    // logging
    logger.error(`Get request on ${originalUrl} from ${ip} which was a 404`);
    // post to stats
    postToStats('show', originalUrl, ip, 'Error: 404');
    // send response
    res.status(404).render('fourOhFour');
  });
};
