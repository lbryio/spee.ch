var path = require('path');
var axios = require('axios');
var lbryApi = require('./lbryApi');
var db = require("../models");

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
			// get all free public claims 
			getAllFreePublicClaims(claimName)
			.then(function(freePublicClaimList){
				var claimName = freePublicClaimList[0].name;
				var claimId = freePublicClaimList[0].claim_id;
				var freePublicClaimUri = claimName + "#" + claimId;
				console.log(">> Decided on public claim URI:", freePublicClaimUri);
				// check to see if the file is available locally
				db.File.findOne({where: { claim_id: claimId }})
				.then(function(claim){
					console.log(">> Asset was found locally");
					// if a record is found, return it
					if (claim){
						var fileInfo = {
							file_name: claim.dataValues.name,
							download_path: claim.dataValues.path,
							content_type: claim.dataValues.file_type
						}
						resolve(fileInfo); 
					// ... otherwise use daemon to retrieve it
					} else {
						// promise to get the chosen uri
						lbryApi.getClaim(freePublicClaimUri)
						.then(function(data){
							resolve({
								file_name: data.result.file_name,
								download_path: data.result.download_path,
								content_type: data.result.metadata.stream.source.contentType
							});
						}).catch(function(error){
							reject(error)
						});
					}
				}).catch(function(error){
					reject(error);
				});
			}).catch(function(error){
				reject(error);
			});
		});
		return deferred;
	},
	getClaimBasedOnUri: function(claimName, claimId){
		var deferred = new Promise(function (resolve, reject){
			var uri = claimName + "#" + claimId;
			console.log(">> lbryHelpers >> getClaimBasedOnUri:", uri);
			// check locally for the claim
			db.File.findOne({where: { claim_id: claimId }})
			.then(function(claim){
				console.log(">> Asset was found locally");
				// if a record is found, return it
				if (claim){
					resolve({
						file_name: claim.dataValues.name,
						download_path: claim.dataValues.path,
						content_type: claim.dataValues.file_type
					}); 
				// ... otherwise use daemon to retrieve it
				} else {
					// get the claim info via 'resolve'
					lbryApi.resolveUri(uri)
					.then(function(resolvedUri){
						// check to make sure it is free and public
						if (isFreePublicClaim(resolvedUri.result[uri].claim)){
							// 'get' the claim
							lbryApi.getClaim(uri)
							.then(function(data){
								resolve({
									file_name: data.result.file_name,
									download_path: data.result.download_path,
									content_type: data.result.metadata.stream.source.contentType
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
				}
			}).catch(function(error){
				reject(error);
			});
		});
		return deferred;
	},
	getAllClaims: function(claimName){  // note: work in progress
		return getAllFreePublicClaims(claimName);
	}
}
