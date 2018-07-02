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
      if (result.length >= 1) {
        logger.info('Tor request blocked:', ip);
        const failureResponse = {
          success: false,
          message: 'Unfortunately this api route is not currently available for tor users.  We are working on a solution that will allow tor users to use this endpoint in the future.',
        };
        res.status(403).json(failureResponse);
      } else {
        return next();
      }
    })
    .catch(error => {
      logger.error(error);
    });
};

module.exports = torCheck;
