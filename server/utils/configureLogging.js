const logger = require('winston');

const { logLevel } = require('@config/loggerConfig');

function configureLogging () {
  if (!logLevel) {
    return logger.warn('No logLevel config received.');
  }
  logger.info('configuring winston logger...');
  // configure the winston logger
  logger.configure({
    transports: [
      new (logger.transports.Console)({
        level                          : this.logLevel,
        timestamp                      : false,
        colorize                       : true,
        prettyPrint                    : true,
        handleExceptions               : true,
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

module.exports = configureLogging;
