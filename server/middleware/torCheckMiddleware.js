const logger = require('winston');

const torCheck = (req, res, next) => {  // custom logging middleware to log all incoming http requests
  const { ip } = req;
  logger.debug(`tor check for ${ip}`);
  next();
};

module.exports = torCheck;
