import logger from 'winston';

import config from '@config/loggerConfig';
const { logLevel } = config;

export default function configureLogging() {
  logger.info('configuring winston logger...');
  if (!config) {
    return logger.warn('No logger config found');
  }
  if (!logLevel) {
    logger.warn('No logLevel found in config.');
  }
  // configure the winston logger
  logger.configure({
    transports: [
      new logger.transports.Console({
        level: logLevel || 'debug',
        timestamp: false,
        colorize: true,
        prettyPrint: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
      }),
    ],
  });
  // test all the log levels
  logger.info('testing winston log levels...');
  logger.warn('Testing: Log Level 1');
  logger.info('Testing: Log Level 2');
  logger.verbose('Testing: Log Level 3');
  logger.debug('Testing: Log Level 4');
  logger.silly('Testing: Log Level 5');
}
