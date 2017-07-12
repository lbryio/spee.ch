const logger = require('winston');
const ua = require('universal-analytics');
const config = require('config');
const db = require('../models');
const googleApiKey = config.get('AnalyticsConfig.GoogleId');

module.exports = {
  postToStats (action, url, ipAddress, name, claimId, fileName, fileType, nsfw, result) {
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
      name,
      claimId,
      fileName,
      fileType,
      nsfw,
      result,
    })
    .then()
    .catch(error => {
      logger.error('sequelize error', error);
    });
  },
  sendGoogleAnalytics (action, headers, ip, originalUrl) {
    const visitorId = ip.replace(/\./g, '-');
    const visitor = ua(googleApiKey, visitorId, { strictCidFormat: false, https: true });
    let params;
    switch (action) {
      case 'serve':
        params = {
          ec : 'serve',
          ea : originalUrl,
          uip: ip,
          ua : headers['user-agent'],
          ul : headers['accept-language'],
        };
        break;
      case 'publish':
        params = {
          ec : 'publish',
          ea : originalUrl,
          uip: ip,
          ua : headers['user-agent'],
          ul : headers['accept-language'],
        };
        break;
      default: break;
    }
    visitor.event(params, (err) => {
      if (err) {
        logger.error('Google Analytics Event Error >>', err);
      }
    });
  },
  getStatsSummary (startDate) {
    logger.debug('retrieving statistics');
    const deferred = new Promise((resolve, reject) => {
      // get the raw statistics data
      db.Stats
        .findAll({
          where: {
            createdAt: {
              gt: startDate,
            },
          },
        })
        .then(data => {
          let resultHashTable = {};
          let totalServe = 0;
          let totalPublish = 0;
          let totalShow = 0;
          let totalCount = 0;
          let totalSuccess = 0;
          let totalFailure = 0;
          let percentSuccess;
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
          percentSuccess = Math.round(totalSuccess / totalCount * 100);
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
  getTrendingClaims (startDate) {
    logger.debug('retrieving trending statistics');
    const deferred = new Promise((resolve, reject) => {
      // get the raw statistics data
      db.Stats
        .findAll({
          where: {
            createdAt: {
              gt: startDate,
            },
            name: {
              not: null,
            },
            claimId: {
              not: null,
            },
          },
        })
        .then(data => {
          let resultHashTable = {};
          let sortableArray = [];
          let sortedArray;
          // summarise the data
          for (let i = 0; i < data.length; i++) {
            let key = `${data[i].name}#${data[i].claimId}`;
            if (resultHashTable[key] === undefined) {
              resultHashTable[key] = {
                count  : 0,
                details: {
                  name    : data[i].name,
                  claimId : data[i].claimId,
                  fileName: data[i].fileName,
                  fileType: data[i].fileType,
                  nsfw    : data[i].nsfw,
                },
              };
            } else {
              resultHashTable[key]['count'] += 1;
            }
          }
          for (let objKey in resultHashTable) {
            if (resultHashTable.hasOwnProperty(objKey)) {
              sortableArray.push([
                resultHashTable[objKey]['count'],
                resultHashTable[objKey]['details'],
              ]);
            }
          }
          sortableArray.sort((a, b) => {
            return b[0] - a[0];
          });
          sortedArray = sortableArray.map((a) => {
            return a[1];
          });
          // return results
          resolve(sortedArray);
        })
        .catch(error => {
          logger.error('sequelize error', error);
          reject(error);
        });
    });
    return deferred;
  },
};
