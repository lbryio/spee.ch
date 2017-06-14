var path = require('path');
var axios = require('axios');
var lbryApi = require('./lbryApi');

function filterForFreePublicClaims(claimsListArray){
	//console.log("claims list:", claimsListArray)
	if (!claimsListArray) {
		return null;
	};
	var freePublicClaims = claimsListArray.filter(function(claim){
		if (!claim.value){
			return false;
		}
		return (((claim.value.stream.metadata.license.indexOf('Public Domain') != -1) || (claim.value.stream.metadata.license.indexOf('Creative Commons') != -1)) &&
		(!claim.value.stream.metadata.fee || claim.value.stream.metadata.fee === 0)); 
	});
	return freePublicClaims;
}

function isFreePublicClaim(claim){
	console.log(">> isFreePublicClaim? claim:", claim);
	if ((claim.value.stream.metadata.license === 'Public Domain' || claim.value.stream.metadata.license === 'Creative Commons') &&
		(!claim.value.stream.metadata.fee || claim.value.stream.metadata.fee.amount === 0)) {
		return true;
	} else {
		return false;
	}
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

function getAllFreePublicClaims(claimName){
	var deferred = new Promise(function(resolve, reject){
		// make a call to the daemon to get the claims list
		lbryApi.getClaimsList(claimName)
		.then(function(data){
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
			console.log(">> lbryHelpers >> getClaim BasedOnNameOnly:", claimName);
			// promise to get all free public claims 
			getAllFreePublicClaims(claimName)
			.then(function(freePublicClaimList){
				var freePublicClaimUri = freePublicClaimList[0].name + "#" + freePublicClaimList[0].claim_id;
				console.log(">> successfully received free public claim URI:", freePublicClaimUri);
				// promise to get the chosen uri
				lbryApi.getClaim(freePublicClaimUri)
				.then(function(data){
					resolve({
						fileName: data.result.file_name,
						directory: data.result.download_directory,
						contentType: data.result.metadata.stream.source.contentType
					});
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
		var deferred = new Promise(function (resolve, reject){
			console.log(">> lbryHelpers >> getClaimBasedOnUri:", uri);
			// resolve the claim
			lbryApi.resolveUri(uri)
			.then(function(resolvedUri){
				//console.log("result >>", resolvedUri)
				// check to make sure it is free and public
				if (isFreePublicClaim(resolvedUri.result[uri].claim)){
					// promise to get the chosen uri
					lbryApi.getClaim(uri)
					.then(function(data){
						resolve({
							fileName: data.result.file_name,
							directory: data.result.download_directory,
							contentType: data.result.metadata.stream.source.contentType
						});
					}).catch(function(error){
						reject(error)
					});
				} else {
					reject("NO_FREE_PUBLIC_CLAIMS");
				}
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
