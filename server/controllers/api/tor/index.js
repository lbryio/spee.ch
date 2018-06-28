const logger = require('winston');
const db = require('../../../models');

const { details: { ipAddress } } = require('@config/siteConfig');

/*

  Route to update and return tor exit nodes that can connect to this ip address

*/

const getTorList = (req, res) => {
  return fetch(`https://check.torproject.org/api/bulk?ip=${ipAddress}&port=80`)
    .then(response => {
      return response.json();
    })
    .then( jsonResponse => {
      const torList = [];
      for (let i = 0; i < jsonResponse.length; i++) {
        torList.push({
          address: jsonResponse[i].Address,
          fingerprint: jsonResponse[i].Fingerprint,
        });
      }
      return db.Tor.destroy({
          truncate: true,
        })
        .then(() => {
          return db.Tor.bulkCreate(torList)
        })
    })
    .then(() => {
      return db.Tor.findAll({
          attributes: ['address', 'fingerprint'],
          raw: true,
        });
    })
    .then( result => {
      logger.debug('number of records', result.length);
      res.status(200).json(result);
    })
    .catch((error) => {
      logger.error(error);
      res.status(500).json({
        success: false,
        error,
      })
    });
};

module.exports = getTorList;
