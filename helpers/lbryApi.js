var path = require('path');
var axios = require('axios');

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

function getClaimWithUri(uri, resolve, reject){
	console.log(">> making get request to lbry daemon");
	axios.post('http://localhost:5279/lbryapi', {
			"method": "get",
			"params": { "uri": uri }
		}
	).then(function (getUriResponse) {
		console.log(">> 'get claim' success...");
		//check to make sure the daemon didn't just time out
		if (getUriResponse.data.result.error){
			reject(getUriResponse.data.result.error);
		}
		console.log(">> response data:", getUriResponse.data);
		console.log(">> dl path =", getUriResponse.data.result.download_path)
		// resolve the promise with the download path for the claim we got
		/* 
			note: put in a check to make sure we do not resolve until the download is actually complete 
		*/
		resolve(getUriResponse.data.result.download_path);
	}).catch(function(getUriError){
		console.log(">> 'get' error.");
		// reject the promise with an error message
		reject(getUriError);
		return;
	});
}

function findAllClaims(name, resolve, reject){
	// to do: abstract claim_list function to here
}

module.exports = {

	publishClaim: function(publishParams){
		console.log("publish params:>", publishParams);
		var deferred = new Promise(function(resolve, reject){
			axios.post('http://localhost:5279/lbryapi', {
				"method": "publish", 
				"params": publishParams
			})
			.then(function (response) {
				// receive resonse from LBRY
				console.log(">> 'publish' success");
				// return the claim we got 
				resolve(response.data);
			}).catch(function(error){
				// receive response from LBRY
				console.log(">> 'publish' error");
				reject(error);
			})
		})
		return deferred;
	},

	getClaimBasedOnNameOnly: function(claimName){
		var deferred = new Promise(function (resolve, reject){
			// make a call to the daemon to get the claims list 
			axios.post('http://localhost:5279/lbryapi', {
				"method": "claim_list", 
				"params": { "name": claimName }
			})
			.then(function (response) {
				console.log(">> 'claim_list' success");
				var claimsList = response.data.result.claims;
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
				// create the uri for the first (selected) claim 
				console.log(">> ordered free public claims");
				var freePublicClaimUri = orderedPublicClaims[0].name + "#" + orderedPublicClaims[0].claim_id;
				console.log(">> your free public claim URI:", freePublicClaimUri);
				// fetch the image to display
				getClaimWithUri(freePublicClaimUri, resolve, reject);
			})
			.catch(function(error){
				console.log(">> 'claim_list' error.");
				reject(error);
			});
		});
		return deferred;
	},

	getClaimBasedOnUri: function(uri){  
		/* 
			to do: need to pass the URI through a test (use 'resolve') to see if it is free and public. Right now it is jumping straight to 'get'ing and serving the asset.
		*/
		var deferred = new Promise(function (resolve, reject){
			console.log(">> get claim based on URI:", uri);
			// fetch the image to display
			getClaimWithUri(uri, resolve, reject);
		});
		return deferred;

	},

	getAllClaims: function(claimName, res){  // note: work in progress
		var deferred = new Promise(function(resolve, reject){
			console.log(">> get all claims data for", claimName)
			// make a call to the daemon to get the claims list 
			axios.post('http://localhost:5279/lbryapi', {
					method: "claim_list",
					params: { name: claimName }
				}
			).then(function (response) {
				console.log(">> 'claim_list' success");
				console.log(">> Number of claims:", response.data.result.claims.length)
				console.log(">> 'claim_list' success");
				var claimsList = response.data.result.claims;
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
				// serve the response
				/*
					to do: rather than returning json, serve a page of all these claims 
				*/
				resolve(orderedPublicClaims); 
			}).catch(function(error){
				console.log(">> 'claim_list' error");
				reject(error);
			})
		});
		return deferred;
	}
}
