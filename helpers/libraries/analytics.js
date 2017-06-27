const db = require('../../models');

function createAnalyticsRecord (action, url, ipAddress, result) {
  db.Usage.create({
    action,
    url,
    ipAddress,
    result,
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
