const logger = require('winston');
const db = require('../models');

const torCheck = (req, res, next) => {
  const { ip } = req;
  logger.debug(`tor check for: ${ip}`);
  return db.Tor.findAll(
    {
      where: {
        address: ip,
      },
      raw: true,
    })
    .then(result => {
      logger.debug('tor check results:', result);
      req['tor'] = (result.length >= 1); // add this to the req object
      next();
    })
    .catch(error => {
      logger.error(error);
    });
};

module.exports = torCheck;
