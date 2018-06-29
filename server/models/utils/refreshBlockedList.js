const logger = require('winston');
const db = require('../index.js');

const refreshBlockedList = () => {
  return fetch('https://api.lbry.io/file/list_blocked')
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
      return jsonResponse.data.outpoints;
    })
    .then(outpoints => {
      let updatePromises = [];
      outpoints.forEach(outpoint => {
        // logger.debug('outpoint:', outpoint);
        updatePromises.push(db.Claim
          .findOne({
            where: {
              outpoint,
            },
          })
          .then(Claim => {
            if (Claim) {
              const { claimId, name } = Claim;
              const blocked = {
                claimId,
                name,
                outpoint,
              };
              return db.upsert(db.Blocked, blocked, blocked, 'Blocked');
            }
          })
          .catch(error => {
            logger.error(error);
          }));
      });
      return Promise.all(updatePromises);
    })
    .then(() => {
      return db.Blocked.findAll({raw: true});
    })
    .catch(error => {
      throw error;
    });
};

module.exports = refreshBlockedList;
