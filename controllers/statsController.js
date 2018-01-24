const logger = require('winston');
const db = require('../models');

module.exports = {
  getTrendingClaims (startDate) {
    logger.debug('retrieving trending');
    return new Promise((resolve, reject) => {
      // get the raw requests data
      db.getTrendingFiles(startDate)
        .then(fileArray => {
          let claimsPromiseArray = [];
          if (fileArray) {
            fileArray.forEach(file => {
              claimsPromiseArray.push(db.Claim.resolveClaim(file.name, file.claimId));
            });
            return Promise.all(claimsPromiseArray);
          }
        })
        .then(claimsArray => {
          resolve(claimsArray);
        })
        .catch(error => {
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
