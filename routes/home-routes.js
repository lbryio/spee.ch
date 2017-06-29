const logger = require('winston');
const { postToStats } = require('../helpers/libraries/statsHelpers.js');

module.exports = app => {
  // route for the home page
  app.get('/', ({ originalUrl, ip, headers }, res) => {
    logger.verbose(`GET request on ${originalUrl} from ${ip}`);
    logger.debug(`headers ${JSON.stringify(headers)}`);
    res.status(200).render('index');
  });
  // a catch-all route if someone visits a page that does not exist
  app.use('*', ({ originalUrl, ip }, res) => {
    logger.error(`Get request on ${originalUrl} from ${ip} which was a 404`);
    postToStats('post', originalUrl, ip, 'Error: 404');
    res.status(404).render('fourOhFour');
  });
};
