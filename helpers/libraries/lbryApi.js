var axios = require('axios');
var db = require("../../models");

module.exports = {
	publishClaim: function(publishParams, fileName, fileType){
		var deferred = new Promise(function(resolve, reject){
			console.log(">> lbryApi >> publishClaim:", publishParams);
			axios.post('http://localhost:5279/lbryapi', {
				"method": "publish", 
				"params": publishParams
			}).then(function (response) {
				console.log(">> 'publish' success", response);
				var result = response.data.result;
				db.File.create({
					name: publishParams.name,
					claim_id: result.claim_id,
					outpoint: result.txid + ":" + result.nout,
					file_name: fileName,
					file_path: publishParams.file_path,
					file_type: fileType,
					nsfw: publishParams.metadata.nsfw,
				}).catch(function(error){
					console.log('An error occurred when writing to the MySQL database:', error);
				});
				resolve(result);
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
				console.log(">> 'get' success");
				//check to make sure the daemon didn't just time out
				if (response.data.result.error){
					reject(response.data.result.error);
				}
				/* 
					note: put in a check to make sure we do not resolve until the download is actually complete (response.data.completed === true)
				*/
				// save a record of the file to the Files table
				var result = response.data.result
				db.File.create({
					name: result.name,
					claim_id: result.claim_id,
					outpoint: result.outpoint,
					file_name: result.file_name,
					file_path: result.download_path,
					file_type: result.mime_type,
					nsfw: result.metadata.stream.metadata.nsfw,
				}).catch(function(error){
					console.log('An error occurred when writing to the MySQL database:', error);
				});
				resolve(result);
			}).catch(function(error){
				console.log(">> 'get' error");
				reject(error);
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
				resolve(response.data.result); 
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
				resolve(response.data.result);
			}).catch(function(error){
				console.log(">> 'resolve' error");
				reject(error);
			});
		});
		return deferred;
	}
}
