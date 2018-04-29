const logger = require('winston');
const db = require('../../../../models');

const updateBlockedList = (req, res) => {
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
      logger.info('number of blocked outpoints:', outpoints.length);
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
              logger.debug(`creating record in Blocked for ${name}#${claimId}`);
              const blocked = {
                claimId,
                name,
                outpoint,
              };
              return db.upsert(db.Blocked, blocked, blocked, 'Blocked')
            }
          })
          .catch(error => {
            logger.error(error);
          }));
      });
      return Promise.all(updatePromises);
    })
    .then(() => {
      logger.info('finished updating blocked content list');
      res.status(200).json({success: true, message: 'finished updating blocked content list'});
    })
    .catch((error) => {
      logger.error(error);
    });
};

module.exports = updateBlockedList;
