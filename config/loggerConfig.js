const logger = require('winston');

function LoggerConfig () {
  this.logLevel = 'debug';
  this.configure = (config) => {
    if (!config) {
      return console.log('No logger config received.');
    }
    console.log('configuring winston logger...');
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
    console.log('testing winston log levels...');
    logger.error('Level 0');
    logger.warn('Level 1');
    logger.info('Level 2');
    logger.verbose('Level 3');
    logger.debug('Level 4');
    logger.silly('Level 5');
  };
};

module.exports = new LoggerConfig();
