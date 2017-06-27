const db = require('../../models');
const logger = require('winston');

function createAnalyticsRecord (action, url, ipAddress, result) {
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
};

module.exports = {
  postRequestAnalytics (url, ipAddress, result) {
    createAnalyticsRecord('request', url, ipAddress, result);
  },
  postPublishAnalytics (url, ipAddress, result) {
    createAnalyticsRecord('publish', url, ipAddress, result);
  },
  postShowAnalytics (url, ipAddress, result) {
    createAnalyticsRecord('show', url, ipAddress, result);
  },
};
