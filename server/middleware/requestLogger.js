const logger = require('winston');

const requestLogger = (req, res, next) => {  // custom logging middleware to log all incoming http requests
  logger.verbose(`Request on ${req.originalUrl} from ${req.ip}`);
  next();
};

module.exports = requestLogger;
