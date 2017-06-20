const fs = require('fs');
const tsFormat = () => (new Date()).toLocaleTimeString();

module.exports = (winston, logLevel, logDir) => {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  winston.configure({
    transports: [
      new (winston.transports.Console)({ 
        level      : logLevel,
        timestamp  : false,
        colorize   : true,
        prettyPrint: true,
      }),
      new (winston.transports.File)({ 
        filename   : `${logDir}speechLogs.log`,
        level      : logLevel,
        json       : false,
        timestamp  : tsFormat,
        colorize   : true,
        prettyPrint: true,
      }),
    ]
  });

  winston.handleExceptions(new winston.transports.File({
    filename                       : `${logDir}uncaughtExceptions.log`,
    humanReadableUnhandledException: true,
  }));

  winston.error('Level 0');
  winston.warn('Level 1');
  winston.info('Level 2');
  winston.verbose('Level 3');
  winston.debug('Level 4');
  winston.silly('Level 5');
};
