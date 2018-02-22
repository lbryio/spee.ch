const config = require('../config/speechConfig.js');
const logger = require('winston');

module.exports = function () {
  // get the config file

  for (let configCategoryKey in config) {
    if (config.hasOwnProperty(configCategoryKey)) {
      // get the final variables for each config category
      const configVariables = config[configCategoryKey];
      for (let configVarKey in configVariables) {
        if (configVariables.hasOwnProperty(configVarKey)) {
          // print each variable
          logger.debug(`CONFIG CHECK: ${configCategoryKey}.${configVarKey} === ${configVariables[configVarKey]}`);
        }
      }
    }
  }
};
