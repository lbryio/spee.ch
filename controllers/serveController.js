var lbryApi = require('../helpers/libraries/lbryApi.js');
var db = require("../models");

var getAllFreePublicClaims = require("../helpers/functions/getAllFreePublicClaims.js");
var isFreePublicClaim = require("../helpers/functions/isFreePublicClaim.js");

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
	getClaimByName: function(claimName){
		var deferred = new Promise(function (resolve, reject){
			console.log(">> lbryHelpers >> getClaim BasedOnNameOnly:", claimName);
			// get all free public claims 
			getAllFreePublicClaims(claimName)
			.then(function(freePublicClaimList){
				var claimId = freePublicClaimList[0].claim_id;
				var name = freePublicClaimList[0].name;
				var freePublicClaimOutpoint = freePublicClaimList[0].txid + ":" + freePublicClaimList[0].nout;
				var freePublicClaimUri = name + "#" + claimId;
				console.log(">> Decided on public claim id:", claimId);
				// check to see if the file is available locally
				db.File.findOne({where: { name: name, claim_id: claimId }})
				.then(function(claim){
					// if a matching claim is found locally...
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
	getClaimByClaimId: function(claimName, claimId){
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
	}
}
