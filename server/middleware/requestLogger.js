import logger from 'winston';

const requestLogger = (req, res, next) => {
  // custom logging middleware to log all incoming http requests
  logger.debug(`Request on ${req.originalUrl} from ${req.ip}`);
  next();
};
export default requestLogger;
