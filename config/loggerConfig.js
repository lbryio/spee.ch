const logger = require('winston');

function LoggerConfig () {
  this.logLevel = 'debug';
  this.update = (config) => {
    if (!config) {
      return logger.warn('No logger config received.');
    }
    logger.info('configuring winston logger...');
    // update values with local config params
    const {logLevel} = config;
    this.logLevel = logLevel;
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
  };
};

module.exports = new LoggerConfig();
