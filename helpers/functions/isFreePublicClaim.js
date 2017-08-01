const logger = require('winston');
const licenses = ['Creative Commons', 'Public Domain', 'Creative Commons Attribution 4.0 International', 'Creative Commons Attribution-ShareAlike 4.0 International', 'Creative Commons Attribution-NoDerivatives 4.0 International', 'Creative Commons Attribution-NonCommercial 4.0 International', 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International', 'Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International'];

module.exports = ({ value }) => {
  logger.debug('checking isFreePublicClaim ?');
  if ((licenses.includes(value.stream.metadata.license)) && (!value.stream.metadata.fee || value.stream.metadata.fee.amount === 0)) {
    return true;
  } else {
    return false;
  }
};
