import logger from 'winston';
import { details } from '@config/siteConfig';
const { ipAddress } = details;

export default (sequelize, { STRING }) => {
  const Tor = sequelize.define(
    'Tor',
    {
      address: {
        type: STRING,
        allowNull: false,
      },
      fingerprint: {
        type: STRING,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );

  Tor.refreshTable = function() {
    let torList = [];
    return fetch(`https://check.torproject.org/api/bulk?ip=${ipAddress}&port=80`)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        logger.debug('total tor nodes:', jsonResponse.length);
        // prep the records
        for (let i = 0; i < jsonResponse.length; i++) {
          torList.push({
            address: jsonResponse[i].Address,
            fingerprint: jsonResponse[i].Fingerprint,
          });
        }
        // clear the table
        return this.destroy({
          truncate: true,
        });
      })
      .then(() => {
        // fill the table
        return this.bulkCreate(torList);
      })
      .then(() => {
        // return the new table
        return this.findAll({
          attributes: ['address', 'fingerprint'],
          raw: true,
        });
      })
      .catch(error => {
        throw error;
      });
  };

  return Tor;
};
