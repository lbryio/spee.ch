const isFreeClaim = require('./isFreeClaim.js');
const lbryApi = require('../lbryApi.js');
const logger = require('winston');

function filterForFreePublicClaims (claimsListArray) {
  logger.debug('filtering claims list for free, public claims');
  if (!claimsListArray) {
    return null;
  }
  const freePublicClaims = claimsListArray.filter(claim => {
    if (!claim.value) {
      return false;
    }
    return isFreeClaim(claim);
  });
  return freePublicClaims;
}

function orderClaims (claimsListArray) {
  logger.debug('ordering the free public claims');
  claimsListArray.sort((a, b) => {
    if (a.amount === b.amount) {
      return a.height < b.height;
    } else {
      return a.amount < b.amount;
    }
  });
  return claimsListArray;
}

module.exports = (claimName) => {
  return new Promise((resolve, reject) => {
    // make a call to the daemon to get the claims list
    lbryApi
      .getClaimList(claimName)
      .then(({ claims }) => {
        logger.debug(`Number of claims: ${claims.length}`);
        // return early if no claims were found
        if (claims.length === 0) {
          logger.debug('exiting due to lack of claims');
          resolve(null);
          return;
        }
        // filter the claims to return only free, public claims
        const freePublicClaims = filterForFreePublicClaims(claims);
        // return early if no free, public claims were found
        if (!freePublicClaims || freePublicClaims.length === 0) {
          logger.debug('exiting due to lack of free or public claims');
          resolve(null);
          return;
        }
        // order the claims
        const orderedPublicClaims = orderClaims(freePublicClaims);
        // resolve the promise
        resolve(orderedPublicClaims);
      })
      .catch(error => {
        reject(error);
      });
  });
};
