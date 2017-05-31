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
	console.log(">> making get request to lbry daemon");
	axios.post('http://localhost:5279/lbryapi', {
			method: "get",
			params: { uri: uri }
		}
	).then(function (getUriResponse) {
		console.log(">> 'get claim' success...");
		//check to make sure the daemon didn't just time out
		if (getUriResponse.data.result.error === "Timeout"){
			reject("get request to lbry daemon timed out");
		}
		console.log(">> response data:", getUriResponse.data);
		console.log(">> dl path =", getUriResponse.data.result.download_path)
		// resolve the promise with the download path for the claim we got
		/* 
			note: put in a check to make sure we do not resolve until the download is actually complete 
		*/
		resolve(getUriResponse.data.result.download_path);
	}).catch(function(getUriError){
		console.log(">> 'get' error:", getUriError.response.data);
		// reject the promise with an error message
		reject(getUriError.response.data.error.message);
		return;
	});
}

function findAllClaims(name, resolve, reject){
	// abstract claim_list function to here
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
			return;
		}).catch(function(error){
			// receive response from LBRY
			// if not successfull, (1) delete file and (2) send response to the client
			console.log(">> 'publish' error.response.data:", error.response.data);
			console.log(" [x] Done");
			//res.status(500).send(JSON.stringify({msg: "your file was not published", err: error.response.data.error.message}));
			return;
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
				var orderedPublcClaims = orderTopClaims(freePublicClaims);

				// create the uri for the first (selected) claim 
				console.log(">> ordered free public claims");
				var freePublicClaimUri = "lbry://" + orderedPublcClaims[0].name + "#" + orderedPublcClaims[0].claim_id;
				console.log(">> your free public claim URI:", freePublicClaimUri);

				// fetch the image to display
				getClaimWithUri(freePublicClaimUri, resolve, reject);

			})
			.catch(function(error){
				console.log(">> 'claim_list' error:", error);
				// reject the promise with an approriate message
				if (error.code === "ECONNREFUSED"){
					reject("Connection refused.  The daemon may not be running.")
				} else {
					reject(error.response.data.error);
				};
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
				// return early if no claims were found
				if (response.data.result.claims.length === 0){
					res.status(307).sendFile(path.join(__dirname, '../public', 'noClaims.html'));
					return;
				}
				// filter the claims to return free, public claims 
				var freePublicClaims = filterForFreePublicClaims(response.data.result.claims);
				// return early if no free, public claims were found
				if (!freePublicClaims || (freePublicClaims.length === 0)){
					res.status(307).sendFile(path.join(__dirname, '../public', 'noClaims.html'));
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
				console.log(">> 'claim_list' error:", error.response.data);
				// serve the response
				res.status(500).send(JSON.stringify({msg: "An error occurred while finding the claim list.", err: error.response.data.error.message}));
			})
			
		});
		return deffered;

	}
}
