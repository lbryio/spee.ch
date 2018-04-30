const logger = require('winston');

const BLOCKED_CLAIM = 'BLOCKED_CLAIM';

module.exports = (sequelize, { STRING }) => {
  const Blocked = sequelize.define(
    'Blocked',
    {
      claimId: {
        type     : STRING,
        allowNull: false,
      },
      name: {
        type     : STRING,
        allowNull: false,
      },
      outpoint: {
        type     : STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Blocked.isNotBlocked = function (claimId, name) {
    logger.debug(`checking to see if ${name}#${claimId} is not blocked`);
    return new Promise((resolve, reject) => {
      this.findOne({
        where: {
          claimId,
          name,
        },
      })
        .then(result => {
          if (result) {
            return reject(BLOCKED_CLAIM);
          }
          resolve(true);
        })
        .catch(error => {
          logger.error(error);
          reject(BLOCKED_CLAIM);
        });
    });
  };

  return Blocked;
};
