const logger = require('winston');
const BLOCKED_CLAIM = 'BLOCKED_CLAIM';

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

  Blocked.getBlockList = function () {
    logger.debug('returning full block list');
    return new Promise((resolve, reject) => {
      this.findAll()
        .then(list => { return resolve(list) });
    });
  };

  Blocked.isNotBlocked = function (outpoint) {
    logger.debug(`checking to see if ${outpoint} is not blocked`);
    return new Promise((resolve, reject) => {
      this.findOne({
        where: {
          outpoint,
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

  Blocked.refreshTable = function (blockEndpoint) {
    let blockedList = [];

    return fetch(blockEndpoint)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.data) {
          throw new Error('no data in list_blocked response');
        }
        if (!jsonResponse.data.outpoints) {
          throw new Error('no outpoints in list_blocked response');
        }
        let outpoints = jsonResponse.data.outpoints;
        logger.debug('total outpoints:', outpoints.length);
        // prep the records
        for (let i = 0; i < outpoints.length; i++) {
          blockedList.push({
            outpoint: outpoints[i],
          });
        }
        // clear the table
        return this.destroy({
          truncate: true,
        });
      })
      .then(() => {
        // fill the table
        return this.bulkCreate(blockedList);
      });
  };

  return Blocked;
};
