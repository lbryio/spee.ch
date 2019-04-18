const logger = require('winston');

const logRequestData = (responseType, claimName, channelName, claimId) => {
  logger.debug('responseType ===', responseType);
  logger.debug('claim name === ', claimName);
  logger.debug('channel name ===', channelName);
  logger.debug('claim id ===', claimId);
};

module.exports = logRequestData;
