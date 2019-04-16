import logger from 'winston';
import db from 'server/models';

/*

  Route to update and return tor exit nodes that can connect to this ip address

*/

const getTorList = (req, res) => {
  db.Tor.refreshTable()
    .then(result => {
      logger.debug('number of records', result.length);
      res.status(200).json(result);
    })
    .catch(error => {
      logger.error(error);
      res.status(500).json({
        success: false,
        error,
      });
    });
};

export default getTorList;
