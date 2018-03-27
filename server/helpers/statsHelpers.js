const logger = require('winston');
const { db } = require('mysqlConfig');
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
};
