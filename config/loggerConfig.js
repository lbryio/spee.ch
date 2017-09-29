module.exports = (winston, logLevel) => {
  winston.configure({
    transports: [
      new (winston.transports.Console)({
        level                          : logLevel,
        timestamp                      : false,
        colorize                       : true,
        prettyPrint                    : true,
        handleExceptions               : true,
        humanReadableUnhandledException: true,
      }),
    ],
  });

  winston.error('Level 0');
  winston.warn('Level 1');
  winston.info('Level 2');
  winston.verbose('Level 3');
  winston.debug('Level 4');
  winston.silly('Level 5');
};
