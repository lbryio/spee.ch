const logger = require('winston');

module.exports = (name) => {
  const config = require(`@config/${name}`);
  if (!config) {
    return logger.warn(`Server could not find config file for ${name}.`);
  }
  logger.debug(`found ${name} config:`, config);
};
