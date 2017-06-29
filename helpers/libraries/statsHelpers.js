const db = require('../../models');
const logger = require('winston');

module.exports = {
  postToStats: (action, url, ipAddress, result) => {
    logger.silly('creating record for statistics db');
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
};
