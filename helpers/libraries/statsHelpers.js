const db = require('../../models');
const logger = require('winston');
const ua = require('universal-analytics');
const config = require('config');
const googleApiKey = config.get('AnalyticsConfig.GoogleId');

module.exports = {
  postToStats: (action, url, ipAddress, result) => {
    logger.silly('creating record for statistics db');
    // make sure the result is a string
    if (result && (typeof result !== 'string')) {
      result = result.toString();
    }
    // // make sure the ip address(es) are a string
    if (ipAddress && (typeof ipAddress !== 'string')) {
      ipAddress = ipAddress.toString();
    }
    // create record in the db
    db.Stats.create({
      action,
      url,
      ipAddress,
      result,
    })
    .then()
    .catch(error => {
      logger.error('sequelize error', error);
    });
  },
  sendGoogleAnalytics: (action, ip, originalUrl) => {
    const visitorId = ip.replace(/\./g, '-');
    const visitor = ua(googleApiKey, visitorId, { strictCidFormat: false, https: true });
    switch (action) {
      case 'serve':
        visitor.event('serve', originalUrl, (err) => {
          if (err) {
            logger.error('Google Analytics Event Error >>', err);
          }
        });
        break;
      case 'show':
        visitor.pageview(originalUrl, 'https://spee.ch', 'show route', (err) => {
          if (err) {
            logger.error('Google Analytics Pageview Error >>', err);
          }
        });
        break;
      case 'publish':
        visitor.event('publish', originalUrl, (err) => {
          if (err) {
            logger.error('Google Analytics Event Error >>', err);
          }
        });
        break;
      default: break;
    }
  },
};
