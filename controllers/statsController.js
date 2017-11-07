const logger = require('winston');
const ua = require('universal-analytics');
const config = require('../config/speechConfig.js');
const db = require('../models');
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
  sendGoogleAnalytics (action, headers, ip, originalUrl) {
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
      case 'PUBLISH':
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
  getTrendingClaims (startDate) {
    logger.debug('retrieving trending requests');
    return new Promise((resolve, reject) => {
      // get the raw requests data
      db.getTrendingClaims(startDate)
      .then(results => {
        if (results) {
          results.forEach(element => {
            const fileExtenstion = element.fileType.substring(element.fileType.lastIndexOf('/') + 1);
            element['showUrlLong'] = `/${element.claimId}/${element.name}`;
            element['directUrlLong'] = `/${element.claimId}/${element.name}.${fileExtenstion}`;
            element['directUrlShort'] = `/${element.claimId}/${element.name}.${fileExtenstion}`;
            element['contentType'] = element.fileType;
            element['thumbnail'] = 'https://spee.ch/assets/img/video_thumb_default.png';
          });
        }
        resolve(results);
      })
      .catch(error => {
        logger.error('sequelize error >>', error);
        reject(error);
      });
    });
  },
  getRecentClaims () {
    logger.debug('retrieving most recent claims');
    return new Promise((resolve, reject) => {
      // get the raw requests data
      db.File.getRecentClaims()
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
