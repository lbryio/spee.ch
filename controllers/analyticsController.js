const logger = require('winston');
const db = require('../models');

module.exports = {
  getAnalyticsSummary: () => {
    logger.debug('retrieving analytics');
    const deferred = new Promise((resolve, reject) => {
      // get the raw analytics data
      db.Analytics
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
