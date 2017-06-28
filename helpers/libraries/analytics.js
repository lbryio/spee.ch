const db = require('../../models');
const logger = require('winston');

module.exports = {
  postToAnalytics: (action, url, ipAddress, result) => {
    logger.silly('creating record for analytics');
    if (result && (typeof result !== 'string')) {
      result = result.toString();
    }
    db.Analytics.create({
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
};
