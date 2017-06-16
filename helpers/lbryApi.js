var axios = require('axios');
var db = require("../models");

module.exports = {
	publishClaim: function(publishParams, fileType){
		var deferred = new Promise(function(resolve, reject){
			console.log(">> lbryApi >> publishClaim:", publishParams);
			axios.post('http://localhost:5279/lbryapi', {
				"method": "publish", 
				"params": publishParams
			}).then(function (response) {
				console.log(">> 'publish' success", response);
				db.File.create({
					name: publishParams.name,
					claim_id: response.data.result.claim_id,
					outpoint: response.data.result.outpoint,
					file_name: "test",
					file_path: publishParams.filePath,
					file_type: fileType,
					nsfw: nsfw,
				}).catch(function(error){
					console.log('An error occurred when writing to the MySQL database:', error);
				});
				resolve(response.data.result);
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
			}).then(function (response) {
				console.log(">> 'get' success", response.data);
				//check to make sure the daemon didn't just time out
				if (response.data.result.error){
					reject(response.data.result.error);
				}
				/* 
					note: put in a check to make sure we do not resolve until the download is actually complete (response.data.completed === true)
				*/
				// save a record of the file to the Files table
				db.File.create({
					name: response.data.result.name,
					claim_id: response.data.result.claim_id,
					outpoint: response.data.result.outpoint,
					file_name: response.data.result.file_name,
					file_path: response.data.result.download_path,
					file_type: response.data.result.mime_type,
					nsfw: response.data.result.metadata.stream.metadata.nsfw,
				}).catch(function(error){
					console.log('An error occurred when writing to the MySQL database:', error);
				});
				// resolve the promise
				resolve(response.data.result);
			}).catch(function(error){
				console.log(">> 'get' error");
				// reject the promise with an error message
				reject(error);
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
