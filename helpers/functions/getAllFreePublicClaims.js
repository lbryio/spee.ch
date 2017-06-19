const isFreePublicClaim = require('./isFreePublicClaim.js');
const lbryApi = require('../libraries/lbryApi.js');
const logger = require('winston');

function filterForFreePublicClaims (claimsListArray) {
  if (!claimsListArray) {
    return null;
  }
  const freePublicClaims = claimsListArray.filter(claim => {
    if (!claim.value) {
      return false;
    }
    return isFreePublicClaim(claim);
  });
  return freePublicClaims;
}

function orderTopClaims (claimsListArray) {
  logger.silly('ordering the top claims');
  claimsListArray.sort((a, b) => {
    if (a.amount === b.amount) {
      return a.height < b.height;
    } else {
      return a.amount < b.amount;
    }
  });
  return claimsListArray;
}

module.exports = claimName => {
  const deferred = new Promise((resolve, reject) => {
    // make a call to the daemon to get the claims list
    lbryApi
      .getClaimsList(claimName)
      .then(({ claims }) => {
        const claimsList = claims;
        console.log('>> Number of claims:', claimsList.length);
        // return early if no claims were found
        if (claimsList.length === 0) {
          reject('NO_CLAIMS');
          console.log('exiting due to lack of claims');
          return;
        }
        // filter the claims to return only free, public claims
        const freePublicClaims = filterForFreePublicClaims(claimsList);
        // return early if no free, public claims were found
        if (!freePublicClaims || freePublicClaims.length === 0) {
          reject('NO_FREE_PUBLIC_CLAIMS');
          console.log('exiting due to lack of free or public claims');
          return;
        }
        // order the claims
        const orderedPublicClaims = orderTopClaims(freePublicClaims);
        // resolve the promise
        resolve(orderedPublicClaims);
      })
      .catch(error => {
        console.log(">> 'claim_list' error");
        reject(error);
      });
  });
  return deferred;
};
