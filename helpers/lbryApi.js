var axios = require('axios');
var db = require("../models");

module.exports = {
	publishClaim: function(publishParams){
		var deferred = new Promise(function(resolve, reject){
			console.log(">> lbryApi >> publishClaim:", publishParams);
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
	getClaim: function(uri){
		var deferred = new Promise(function(resolve, reject){
			console.log(">> lbryApi >> getClaim:", uri);
			axios.post('http://localhost:5279/lbryapi', {
				"method": "get",
				"params": { "uri": uri, "timeout": 20}
			}).then(function (getResponse) {
				console.log(">> 'get' success", getResponse.data);
				//check to make sure the daemon didn't just time out (or otherwise send an error that appears to be a success response)
				if (getResponse.data.result.error){
					reject(getResponse.data.result.error);
				}
				// resolve the promise with the download path for the claim we got
				/* 
					note: put in a check to make sure we do not resolve until the download is actually complete (response.data.completed === true)
				*/
				// save a record of the file to the Files table
				db.File.create({
					name: getResponse.data.result.file_name,
					path: getResponse.data.result.download_path,
					file_type: getResponse.data.result.mime_type,
					claim_id: getResponse.data.result.claim_id,
					nsfw: getResponse.data.result.metadata.stream.metadata.nsfw,
				}).catch(function(error){
					console.log('an error occurred when writing to the MySQL database. Check the logs.');
				});
				// resolve the promise
				resolve(getResponse.data);  //to do: return the result 
			}).catch(function(getUriError){
				console.log(">> 'get' error");
				// reject the promise with an error message
				reject(getUriError);
				return;
			});
		});
		return deferred;
	},
	getClaimsList: function(claimName){
		var deferred = new Promise(function(resolve, reject){
			console.log(">> lbryApi >> getClaimList:", claimName);
			axios.post('http://localhost:5279/lbryapi', {
				method: "claim_list",
				params: { name: claimName }
			}).then(function (response) {
				console.log(">> 'claim_list' success");
				resolve(response.data); 
			}).catch(function(error){
				console.log(">> 'claim_list' error");
				reject(error);
			});
		});
		return deferred;
	},
	resolveUri: function(uri){
		var deferred = new Promise(function(resolve, reject){
			console.log(">> lbryApi >> resolveUri:", uri);
			axios.post('http://localhost:5279/lbryapi', {
				"method": "resolve",
				"params": { "uri": uri}
			}).then(function(response){
				console.log(">> 'resolve' success");
				resolve(response.data);
			}).catch(function(error){
				console.log(">> 'resolve' error");
				reject(error);
			});
		});
		return deferred;
	}
}
