const logger = require('winston');
const ua = require('universal-analytics');
const config = require('config');
const db = require('../models');
const googleApiKey = config.get('AnalyticsConfig.GoogleId');

module.exports = {
  postToStats (action, url, ipAddress, name, claimId, result) {
    // make sure the result is a string
    if (result && (typeof result !== 'string')) {
      result = result.toString();
    }
    // make sure the ip address(es) are a string
    if (ipAddress && (typeof ipAddress !== 'string')) {
      ipAddress = ipAddress.toString();
    }
    db.File
      .findOne({where: { name, claimId }})
      .then(file => {
        // create record in the db
        let FileId;
        if (file) {
          FileId = file.dataValues.id;
        } else {
          FileId = null;
        }
        return db.Request
          .create({
            action,
            url,
            ipAddress,
            result,
            FileId,
          });
      })
      .catch(error => {
        logger.error('Sequelize error', error);
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
    logger.debug('retrieving request records');
    return new Promise((resolve, reject) => {
      // get the raw Requests data
      db.Request
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
  },
  getTrendingClaims (startDate) {
    logger.debug('retrieving trending requests');
    const dateTime = startDate.toISOString().slice(0, 19).replace('T', ' ');
    return new Promise((resolve, reject) => {
      // get the raw requests data
      db.sequelize
        .query(`SELECT COUNT(*), File.* FROM Request LEFT JOIN File ON Request.FileId = File.id WHERE FileId IS NOT NULL AND nsfw != 1 AND trendingEligible = 1 AND Request.createdAt > "${dateTime}" GROUP BY FileId ORDER BY COUNT(*) DESC LIMIT 25;`, { type: db.sequelize.QueryTypes.SELECT })
        .then(results => {
          resolve(results);
        })
        .catch(error => {
          logger.error('sequelize error', error);
          reject(error);
        });
    });
  },
};
