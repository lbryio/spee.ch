const getAllFreePublicClaims = require('../helpers/functions/getAllFreePublicClaims.js')

module.exports = {
  getAllClaims (claimName) {
    return getAllFreePublicClaims(claimName)
  },
}
