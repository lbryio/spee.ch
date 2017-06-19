const getAllFreePublicClaims = require('../helpers/functions/getAllFreePublicClaims.js');
const logger = require('winston');

module.exports = {
  getAllClaims (claimName) {
    logger.debug(`getAllClaims start for ${claimName}`);
    return getAllFreePublicClaims(claimName);
  },
};
