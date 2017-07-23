const logger = require('winston');
const licenses = ['Creative Commons', 'Public Domain', 'CC Attribution-NonCommercial 4.0 International'];
module.exports = ({ value }) => {
  logger.debug('checking isFreePublicClaim ?');
  if (
    (Array.asList(licenses).contains(value.stream.metadata.license)) &&
    (!value.stream.metadata.fee || value.stream.metadata.fee.amount === 0)
  ) {
    return true;
  } else {
    return false;
  }
};
