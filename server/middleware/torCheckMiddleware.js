const logger = require('winston');
const db = require('../models');

const torCheck = ({ ip, headers, body }, res, next) => {
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
      if (result.length >= 1) {
        logger.debug('this is a tor ip');
        const failureResponse = {
          success: 'false',
          message: 'Unfortunately this api route is not currently available for tor users.  We are working on a solution that will allow tor users to use this endpoint in the future.',
        };
        return res.status(400).json(failureResponse);
      } else {
        logger.debug('this is not a tor ip');
        return next();
      }
    })
    .catch(error => {
      logger.error(error);
    });
};

module.exports = torCheck;
