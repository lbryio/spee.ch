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

function getClaimAndHandleResponse(claimUri, resolve, reject){
	lbryApi.getClaim(claimUri)
	.then(function(result){
		resolve({
			file_name: result.file_name,
			file_path: result.download_path,
			file_type: result.mime_type
		});
	}).catch(function(error){
		reject(error)
	});
}

module.exports = {
	getClaimBasedOnNameOnly: function(claimName){
		var deferred = new Promise(function (resolve, reject){
			console.log(">> lbryHelpers >> getClaim BasedOnNameOnly:", claimName);
			// get all free public claims 
			getAllFreePublicClaims(claimName)
			.then(function(freePublicClaimList){
				console.log(">> Decided on public claim id:", freePublicClaimList[0].claim_id);
				var freePublicClaimOutpoint = freePublicClaimList[0].txid + ":" + freePublicClaimList[0].nout;
				var freePublicClaimUri = freePublicClaimList[0].name + "#" + freePublicClaimList[0].claim_id;
				// check to see if the file is available locally
				db.File.findOne({where: { claim_id: freePublicClaimList[0].claim_id }})
				.then(function(claim){
					// if a found locally...
					if (claim){
						console.log(">> A matching claim_id was found locally");
						// if the outpoint's match return it
						if (claim.dataValues.outpoint === freePublicClaimOutpoint){
							console.log(">> Local outpoint matched");
							resolve(claim.dataValues); 
						// if the outpoint's don't match, fetch updated claim 	
					} else {
							console.log(">> local outpoint did not match");
							getClaimAndHandleResponse(freePublicClaimUri, resolve, reject);
						}
					// ... otherwise use daemon to retrieve it
					} else {
						// 'get' the claim
						getClaimAndHandleResponse(freePublicClaimUri, resolve, reject)
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
			// resolve the Uri
			lbryApi.resolveUri(uri)  // note: use 'spread' and make parallel with db.File.findOne()
			.then(function(result){  // note should just be 'result' returned.
				// get the outpoint 
				var resolvedOutpoint = result[uri].claim.txid + ":" + result[uri].claim.nout;
				// check locally for the claim
				db.File.findOne({where: { claim_id: claimId }})
				.then(function(claim){
					// if a found locally...
					if (claim){
						console.log(">> A matching claim_id was found locally");
						// if the outpoint's match return it
						if (claim.dataValues.outpoint === resolvedOutpoint){
							console.log(">> Local outpoint matched");
							resolve(claim.dataValues); 
						// if the outpoint's don't match, fetch updated claim 	
						} else {
							console.log(">> Local outpoint did not match");
							getClaimAndHandleResponse(uri, resolve, reject);
						}
					// ... otherwise use daemon to retrieve it
					} else {
						// check to make sure it is free and public  (note: no need for another resolve?)
						if (isFreePublicClaim(result[uri].claim)){
							// 'get' the claim
							getClaimAndHandleResponse(uri, resolve, reject);
						} else {
							reject("NO_FREE_PUBLIC_CLAIMS");
						}
					}
				}).catch(function(error){
					reject(error)
				});
			}).catch(function(error){
				reject(error);
			});
		});
		return deferred;
	},
	getAllClaims: function(claimName){
		return getAllFreePublicClaims(claimName);
	}
}
