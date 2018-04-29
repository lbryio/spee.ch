const logger = require('winston');

module.exports = (sequelize, { STRING }) => {
  const Blocked = sequelize.define(
    'Blocked',
    {
      outpoint: {
        type     : STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Blocked.isBlocked = function (outpoint) {
    logger.debug(`checking to see if ${outpoint} is blocked`);
    return new Promise((resolve, reject) => {
      this.findOne({
        where: {
          outpoint,
        },
      })
        .then(result => {
          if (!result) {
            return resolve(false);
          }
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  return Blocked;
};
