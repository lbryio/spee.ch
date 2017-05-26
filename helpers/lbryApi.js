// load dependencies
var path = require('path');
var axios = require('axios');

// helper function to filter an array of claims for only free, public claims
function filterForFreePublicClaims(claimsListArray){
	//console.log(">> filterForFreePublicClaims, claimsListArray:", claimsListArray);
	if (!claimsListArray) {
		return null;
	};
	var freePublicClaims = claimsListArray.filter(function(claim){
		return (((claim.value.stream.metadata.license.indexOf('Public Domain') != -1) || (claim.value.stream.metadata.license.indexOf('Creative Commons') != -1)) &&
		(!claim.value.stream.metadata.fee || claim.value.stream.metadata.fee === 0)); 
	});
	return freePublicClaims;
}
// helper function to decide if a claim is free and public
function isFreePublicClaim(claim){
	console.log(">> isFreePublicClaim, claim:", claim);
	if ((claim.value.stream.metadata.license === 'Public Domain' || claim.value.stream.metadata.license === 'Creative Commons') &&
		(!claim.value.stream.metadata.fee || claim.value.stream.metadata.fee.amount === 0)) {
		return true;	 
	} else {
		return false;
	}
}
// helper function to order a set of claims
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
	axios.post('http://localhost:5279/lbryapi', {
			method: "get",
			params: { uri: uri }
		}
	).then(function (getUriResponse) {
		console.log(">> 'get claim' success...");
		console.log(">> response data:", getUriResponse.data);
		console.log(">> dl path =", getUriResponse.data.result.download_path)
		// resolve the promise with the download path for the claim we got
		/* note: do not resolve until the download is actually complete */
		resolve(getUriResponse.data.result.download_path);
	}).catch(function(getUriError){
		console.log(">> 'get' error:", getUriError.response.data);
		// reject the promise with an error message
		reject({
			msg: "An error occurred while fetching the free, public claim by URI.", 
			err: getUriError.response.data.error.message
		});
	});
}

module.exports = {

	publishClaim: function(publishObject){
		axios.post('http://localhost:5279/lbryapi', publishObject)
		.then(function (response) {
			// receive resonse from LBRY
			// if successfull, (1) delete file (2) send response to the client
			console.log(">> 'publish' success...");
			console.log(">> 'publish' response.data:", response.data);
			console.log(" [x] Done");
			// return the claim we got 
			//res.status(200).send(JSON.stringify({msg: "you succsessfully published!", txData: response.data}));
		}).catch(function(error){
			// receive response from LBRY
			// if not successfull, (1) delete file and (2) send response to the client
			console.log(">> 'publish' error.response.data:", error.response.data);
			console.log(" [x] Done");
			//res.status(500).send(JSON.stringify({msg: "your file was not published", err: error.response.data.error.message}));
		})
	},

	getClaimBasedOnNameOnly: function(claimName){
		// 1. create a promise
		var deferred = new Promise(function (resolve, reject){
			// 2. code to resolve or reject the promise
			// make a call to the daemon to get the claims list 
			axios.post('http://localhost:5279/lbryapi', {  // receives a promise
				method: "claim_list", 
				params: { name: claimName }
			})
			.then(function (response) {
				console.log(">> Claim_list success");

				var claimsList = response.data.result.claims;
				console.log(">> Number of claims:", claimsList.length)
				
				// return early if no claims were found
				if (claimsList.length === 0){
					reject("no claims were found");
					console.log("exiting due to lack of claims");
					return;
				}
				
				// filter the claims to return only free, public claims 
				var freePublicClaims = filterForFreePublicClaims(claimsList);

				// return early if no free, public claims were found
				if (!freePublicClaims || (freePublicClaims.length === 0)){
					reject("no free, public claims were found");
					console.log("exiting due to lack of free or public claims");
					return;
				}

				// order the claims
				var orderedPublcClaims = orderTopClaims(freePublicClaims);

				// create the uri for the first (selected) claim 
				console.log(">> ordered free public claims", orderedPublcClaims);
				var freePublicClaimUri = "lbry://" + orderedPublcClaims[0].name + "#" + orderedPublcClaims[0].claim_id;
				console.log(">> your free public claim uri:", freePublicClaimUri);

				// fetch the image to display
				getClaimWithUri(freePublicClaimUri, resolve, reject);

			})
			.catch(function(error){
				console.log(">> error:", error);
				// reject the promise with an approriate message
				reject(error.response.data.error);
				return;
			});
		});
		// 3. return the promise
		return deferred;
		
	},

	getClaimBasedOnUri: function(uri){  
		/* 
			to do: need to pass the URI through a test (use 'resolve') to see if it is free and public. Right now it is jumping straight to 'get'ing and serving the asset.
		*/
		var deferred = new Promise(function (resolve, reject){
			console.log(">> your uri:", uri);

			// fetch the image to display
			getClaimWithUri(uri, resolve, reject);
		});
		return deferred;

	},

	serveAllClaims: function(claimName, res){
		// make a call to the daemon to get the claims list 
		axios.post('http://localhost:5279/lbryapi', {
				method: "claim_list",
				params: { name: claimName }
			}
		).then(function (response) {
			console.log(">> Claim_list success");
			console.log(">> Number of claims:", response.data.result.claims.length)
			// return early if no claims were found
			if (response.data.result.claims.length === 0){
				res.status(200).sendFile(path.join(__dirname, '../public', 'noClaims.html'));
				return;
			}
			// filter the claims to return free, public claims 
			var freePublicClaims = filterForFreePublicClaims(response.data.result.claims);
			// return early if no free, public claims were found
			if (!freePublicClaims || (freePublicClaims.length === 0)){
				res.status(200).sendFile(path.join(__dirname, '../public', 'noClaims.html'));
				return;
			}
			console.log(">> Number of free public claims:", freePublicClaims.length);
			// order the claims
			var orderedPublicClaims = orderTopClaims(freePublicClaims);
			// serve the response
			/*
				to do: rather than returning json, serve a page of all these claims 
			*/
			res.status(200).send(orderedPublicClaims); 
		}).catch(function(error){
			console.log(">> /c/ error:", error.response.data);
			// serve the response
			res.status(500).send(JSON.stringify({msg: "An error occurred while finding the claim list.", err: error.response.data.error.message}));
		})
	}
}
