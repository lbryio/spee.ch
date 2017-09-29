const config = require('config');
const logger = require('winston');
const fs = require('fs');

module.exports = function () {
  // get the config file
  const defaultConfigFile = JSON.parse(fs.readFileSync('./config/default.json'));

  for (let configCategoryKey in defaultConfigFile) {
    if (defaultConfigFile.hasOwnProperty(configCategoryKey)) {
        // get the final variables for each config category
      const configVariables = config.get(configCategoryKey);
      for (let configVarKey in configVariables) {
        if (configVariables.hasOwnProperty(configVarKey)) {
            // print each variable
          logger.debug(`CONFIG CHECK: ${configCategoryKey}.${configVarKey} === ${configVariables[configVarKey]}`);
        }
      }
    }
  }
};
