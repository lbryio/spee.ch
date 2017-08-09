const logger = require('winston');

module.exports = ({ value }) => {
  if (!value.stream.metadata.fee || value.stream.metadata.fee.amount === 0) {
    logger.debug('isFreeClaim?', true);
    return true;
  } else {
    logger.debug('isFreePublicClaim?', false);
    return false;
  }
};
