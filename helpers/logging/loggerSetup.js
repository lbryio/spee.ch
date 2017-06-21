const fs = require('fs');

module.exports = (winston, logLevel, logDir) => {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

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
      new (winston.transports.File)({
        filename                       : `${logDir}/speechLogs.log`,
        level                          : logLevel,
        json                           : false,
        timestamp                      : true,
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
