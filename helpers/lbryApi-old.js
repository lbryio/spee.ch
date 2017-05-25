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
	serveClaimBasedOnNameOnly: function(claimName, res){
		// make a call to the daemon to get the claims list 
		axios.post('http://localhost:5279/lbryapi', {
				method: "claim_list",
				params: {
					name: claimName
				}
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
			// order the claims
			var orderedPublcClaims = orderTopClaims(freePublicClaims);
			// create the uri for the first (selected) claim 
			console.log(">> ordered free public claims", orderedPublcClaims);
			var freePublicClaimUri = "lbry://" + orderedPublcClaims[0].name + "#" + orderedPublcClaims[0].claim_id;
			console.log(">> your free public claim uri:", freePublicClaimUri);
			// fetch the image to display
			axios.post('http://localhost:5279/lbryapi', {
					method: "get",
					params: {
						uri: freePublicClaimUri
					}
				}
			).then(function (getResponse) {
				console.log(">> 'get claim' success...");
				console.log(">> response data:", getResponse.data);
				console.log(">> dl path =", getResponse.data.result.download_path)
				// return the claim we got 
				res.status(200).sendFile(getResponse.data.result.download_path);
			}).catch(function(getError){
				console.log(">> /c/ 'get' error:", getError.response.data);
				res.status(500).send(JSON.stringify({msg: "An error occurred while fetching the free, public claim by URI.", err: getError.response.data.error.message}));
			})
		}).catch(function(error){
			console.log(">> /c/ error:", error.response.data);
			res.status(500).send(JSON.stringify({msg: "An error occurred while getting the claim list.", err: error.response.data.error.message}));
		})
	},
	serveClaimBasedOnUri: function(uri, res){  
		/* 
			to do: need to pass the URI through a test (use 'resolve') to see if it is free and public. Right now it is jumping straight to 'get'ing and serving the asset.
		*/
		console.log(">> your uri:", uri);
		// fetch the image to display
		axios.post('http://localhost:5279/lbryapi', {  // to do: abstract this code to a function that can be shared
				method: "get",
				params: {
					uri: uri
				}
			}
		).then(function (getResponse) {
			console.log(">> 'get claim' success...");
			console.log(">> response data:", getResponse.data);
			console.log(">> dl path =", getResponse.data.result.download_path)
			/* 
				to do: make sure the file has completed downloading before serving back the file 
			*/
			// return the claim we got 
			res.status(200).sendFile(getResponse.data.result.download_path);

			/* delete the file after a certain amount of time? */

		}).catch(function(error){
			console.log(">> /c/ 'get' error:", error.response.data);
			res.status(500).send(JSON.stringify({msg: "an error occurred", err: error.response.data.error.message}));
		})
	},
	serveAllClaims: function(claimName, res){
		// make a call to the daemon to get the claims list 
		axios.post('http://localhost:5279/lbryapi', {
				method: "claim_list",
				params: {
					name: claimName
				}
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
			res.status(200).send(orderedPublicClaims); //to do: rather than returning json, serve a page of all these claims 
		}).catch(function(error){
			console.log(">> /c/ error:", error.response.data);
			// serve the response
			res.status(500).send(JSON.stringify({msg: "An error occurred while finding the claim list.", err: error.response.data.error.message}));
		})
	}
}
