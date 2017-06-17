var isFreePublicClaim = require("./isFreePublicClaim.js");
var lbryApi = require('../libraries/lbryApi.js');

function filterForFreePublicClaims(claimsListArray){
	//console.log("claims list:", claimsListArray)
	if (!claimsListArray) {
		return null;
	};
	var freePublicClaims = claimsListArray.filter(function(claim){
		if (!claim.value){
			return false;
		}
		return (isFreePublicClaim(claim));
	});
	return freePublicClaims;
}

function orderTopClaims(claimsListArray){
	console.log(">> orderTopClaims");
	claimsListArray.sort(function(claimA, claimB){
		if (claimA.amount === claimB.amount){
			return (claimA.height > claimB.height);
		} else {
			return (claimA.amount < claimB.amount);
		}
	})
	return claimsListArray;
}

module.exports = function(claimName){
	var deferred = new Promise(function(resolve, reject){
		// make a call to the daemon to get the claims list
		lbryApi.getClaimsList(claimName)
		.then(function(result){
			var claimsList = result.claims;
			console.log(">> Number of claims:", claimsList.length)
			// return early if no claims were found
			if (claimsList.length === 0){
				reject("NO_CLAIMS");
				console.log("exiting due to lack of claims");
				return;
			}
			// filter the claims to return only free, public claims 
			var freePublicClaims = filterForFreePublicClaims(claimsList);
			// return early if no free, public claims were found
			if (!freePublicClaims || (freePublicClaims.length === 0)){
				reject("NO_FREE_PUBLIC_CLAIMS");
				console.log("exiting due to lack of free or public claims");
				return;
			}
			// order the claims
			var orderedPublicClaims = orderTopClaims(freePublicClaims);
			// resolve the promise
			resolve(orderedPublicClaims); 
		}).catch(function(error){
			console.log(">> 'claim_list' error");
			reject(error);
		});
	});
	return deferred;
}