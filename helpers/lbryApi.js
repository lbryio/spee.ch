var axios = require('axios');

module.exports = {
	publishClaim: function(publishParams){
		console.log("publish params:>", publishParams);
		var deferred = new Promise(function(resolve, reject){
			axios.post('http://localhost:5279/lbryapi', {
				"method": "publish", 
				"params": publishParams
			}).then(function (response) {
				console.log(">> 'publish' success");
				resolve(response.data);
			}).catch(function(error){
				console.log(">> 'publish' error");
				reject(error);
			});
		});
		return deferred;
	},
	getClaim: function(uri){  // note: move to lbryApi
		var deferred = new Promise(function(resolve, reject){
			console.log(">> making get request to lbry daemon");
			axios.post('http://localhost:5279/lbryapi', {
				"method": "get",
				"params": { "uri": uri }
			}).then(function (getResponse) {
				console.log(">> 'get claim' success...");
				//check to make sure the daemon didn't just time out (or otherwise send an error that appears to be a success?)
				// if (getResponse.data.result.error){
				// 	reject(getResponse.data.result.error);
				// }
				console.log(">> response data:", getResponse.data);
				// resolve the promise with the download path for the claim we got
				/* 
					note: put in a check to make sure we do not resolve until the download is actually complete (total_bytes should match written_bytes)
				*/
				resolve(getResponse.data);
			}).catch(function(getUriError){
				console.log(">> 'get' error.");
				// reject the promise with an error message
				reject(getUriError);
				return;
			});
		});
		return deferred;
	},
	getClaimsList: function(claimName){
		var deferred = new Promise(function(resolve, reject){
			console.log(">> claims_list for", claimName)
			axios.post('http://localhost:5279/lbryapi', {
				method: "claim_list",
				params: { name: claimName }
			}).then(function (response) {
				console.log(">> claim_list success");
				resolve(response.data); 
			}).catch(function(error){
				console.log(">> claim_list error");
				reject(error);
			});
		});
		return deferred;
	},
	resolveUri: function(uri){
		var deferred = new Promise(function(resolve, reject){
			console.log(">> resolve uri for", uri)
			axios.post('http://localhost:5279/lbryapi', {
				"method": "resolve",
				"params": { "uri": uri}
			}).then(function(response){
				console.log(response.data);
				resolve(response.data);
			}).catch(function(error){
				console.log(">> 'resolve' error");
				reject(error);
			});
		});
		return deferred;
	}
}
