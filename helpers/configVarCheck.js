const config = require('config');
const logger = require('winston');

module.exports = function () {
  let configVars = [];
  configVars.push(config.get('Logging'));
  configVars.push(config.get('Database'));
  configVars.push(config.get('AnalyticsConfig'));
  configVars.push(config.get('WalletConfig'));

  for (let i = 0; i < configVars.length; i++) {
    for (let key in configVars[i]) {
      if (configVars[i].hasOwnProperty(key)) {
        logger.debug(`CONFIG CHECK: ${key} === ${configVars[i][key]}`);
      }
    }
  }
};
