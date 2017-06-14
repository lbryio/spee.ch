var path = require('path');
var axios = require('axios');
var lbryApi = require('./lbryApi');

function filterForFreePublicClaims(claimsListArray){
	if (!claimsListArray) {
		return null;
	};
	var freePublicClaims = claimsListArray.filter(function(claim){
		return (((claim.value.stream.metadata.license.indexOf('Public Domain') != -1) || (claim.value.stream.metadata.license.indexOf('Creative Commons') != -1)) &&
		(!claim.value.stream.metadata.fee || claim.value.stream.metadata.fee === 0)); 
	});
	return freePublicClaims;
}

function isFreePublicClaim(claim){
	console.log(">> isFreePublicClaim, claim:", claim);
	if ((claim.value.stream.metadata.license === 'Public Domain' || claim.value.stream.metadata.license === 'Creative Commons') &&
		(!claim.value.stream.metadata.fee || claim.value.stream.metadata.fee.amount === 0)) {
		return true;
	} else {
		return false;
	}
}

function orderTopClaims(claimsListArray){
	console.log(">> orderTopClaims, claimsListArray:");
	claimsListArray.sort(function(claimA, claimB){
		if (claimA.amount === claimB.amount){
			return (claimA.height > claimB.height);
		} else {
			return (claimA.amount < claimB.amount);
		}
	})
	return claimsListArray;
}

function getAllFreePublicClaims(claimName){  // note: work in progress
	var deferred = new Promise(function(resolve, reject){
		console.log(">> get all claims data for", claimName)
		// make a call to the daemon to get the claims list
		lbryApi.getClaimsList(claimName)
		.then(function(data){
			console.log(">> 'claim_list' success");
			var claimsList = data.result.claims;
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

module.exports = {
	getClaimBasedOnNameOnly: function(claimName){
		var deferred = new Promise(function (resolve, reject){
			console.log(">> get all free claims for", claimName);
			// promise to get all free public claims 
			getAllFreePublicClaims(claimName)
			.then(function(freePublicClaimList){
				var freePublicClaimUri = freePublicClaimList[0].name + "#" + freePublicClaimList[0].claim_id;
				console.log(">> your free public claim URI:", freePublicClaimUri);
				// promise to get the chosen uri
				lbryApi.getClaim(freePublicClaimUri)
				.then(function(data){
					console.log(">> dl path =", data.result.download_path)
					resolve(data.result.download_path)
				}).catch(function(error){
					reject(error)
				});
			}).catch(function(error){
				reject(error);
			});
		});
		return deferred;
	},
	getClaimBasedOnUri: function(uri){  
		/* 
			to do: need to pass the URI through a test to see if it is free and public. Right now it is jumping straight to 'get'ing and serving the asset.
		*/
		var deferred = new Promise(function (resolve, reject){
			console.log(">> get claim based on URI:", uri);
			// promise to get the chosen uri
			lbryApi.getClaim(uri)
			.then(function(data){
				console.log(">> dl path =", data.result.download_path)
				resolve(data.result.download_path)
			}).catch(function(error){
				reject(error)
			});
		});
		return deferred;
	},
	getAllClaims: function(claimName){  // note: work in progress
		return getAllFreePublicClaims(claimName);
	}
}
