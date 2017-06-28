const logger = require('winston');
const { postShowAnalytics } = require('../helpers/libraries/analytics');

module.exports = app => {
  // route for the home page
  app.get('/', ({ originalUrl, ip }, res) => {
    logger.debug(`GET request on ${originalUrl} from ${ip}`);
    res.status(200).render('index');
  });
  // a catch-all route if someone visits a page that does not exist
  app.use('*', ({ originalUrl, ip }, res) => {
    logger.error(`Get request on ${originalUrl} from ${ip} which was a 404`);
    postShowAnalytics(originalUrl, ip, 'Error: 404');
    res.status(404).render('fourOhFour');
  });
};
