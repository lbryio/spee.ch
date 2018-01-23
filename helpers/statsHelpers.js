const logger = require('winston');
const ua = require('universal-analytics');
const config = require('../config/speechConfig.js');
const db = require('../models/index');
const googleApiKey = config.analytics.googleId;

module.exports = {
  postToStats (action, url, ipAddress, name, claimId, result) {
    logger.debug('action:', action);
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
        logger.error('Sequelize error >>', error);
      });
  },
  sendGoogleAnalyticsEvent (action, headers, ip, originalUrl) {
    const visitorId = ip.replace(/\./g, '-');
    const visitor = ua(googleApiKey, visitorId, { strictCidFormat: false, https: true });
    let params;
    switch (action) {
      case 'SERVE':
        params = {
          ec : 'serve',
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
  sendGoogleAnalyticsTiming (action, headers, ip, originalUrl, startTime, endTime) {
    const visitorId = ip.replace(/\./g, '-');
    const visitor = ua(googleApiKey, visitorId, { strictCidFormat: false, https: true });
    const time = endTime - startTime;
    let params;
    switch (action) {
      case 'PUBLISH':
        params = {
          userTimingCategory    : 'lbrynet',
          userTimingVariableName: 'publish',
          userTimingTime        : time,
          uip                   : ip,
          ua                    : headers['user-agent'],
          ul                    : headers['accept-language'],
        };
        break;
      default: break;
    }
    visitor.timing(params, (err) => {
      if (err) {
        logger.error('Google Analytics Event Error >>', err);
      }
    });
  },
};
