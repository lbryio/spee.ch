const logger = require('winston');
const ua = require('universal-analytics');
const config = require('config');
const db = require('../models');
const googleApiKey = config.get('AnalyticsConfig.GoogleId');

module.exports = {
  postToStats (action, url, ipAddress, result) {
    logger.silly(`creating ${action} record for statistics db`);
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
  sendGoogleAnalytics (action, ip, originalUrl) {
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
  getStatsSummary () {
    logger.debug('retrieving site statistics');
    const deferred = new Promise((resolve, reject) => {
      // get the raw statistics data
      db.Stats
        .findAll()
        .then(data => {
          const resultHashTable = {};
          let totalServe = 0;
          let totalPublish = 0;
          let totalShow = 0;
          let totalCount = 0;
          let totalSuccess = 0;
          let totalFailure = 0;
          // sumarise the data
          for (let i = 0; i < data.length; i++) {
            let key = data[i].action + data[i].url;
            totalCount += 1;
            switch (data[i].action) {
              case 'serve':
                totalServe += 1;
                break;
              case 'publish':
                totalPublish += 1;
                break;
              case 'show':
                totalShow += 1;
                break;
              default: break;
            }
            if (resultHashTable[key]) {
              resultHashTable[key]['count'] += 1;
              if (data[i].result === 'success') {
                resultHashTable[key]['success'] += 1;
                totalSuccess += 1;
              } else {
                resultHashTable[key]['failure'] += 1;
                totalFailure += 1;
              }
            } else {
              resultHashTable[key] = {
                action : data[i].action,
                url    : data[i].url,
                count  : 1,
                success: 0,
                failure: 0,
              };
              if (data[i].result === 'success') {
                resultHashTable[key]['success'] += 1;
                totalSuccess += 1;
              } else {
                resultHashTable[key]['failure'] += 1;
                totalFailure += 1;
              }
            }
          }
          const percentSuccess = Math.round(totalSuccess / totalCount * 100);
          // return results
          resolve({ records: resultHashTable, totals: { totalServe, totalPublish, totalShow, totalCount, totalSuccess, totalFailure }, percentSuccess });
        })
        .catch(error => {
          logger.error('sequelize error', error);
          reject(error);
        });
    });
    return deferred;
  },
};
