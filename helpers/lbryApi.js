var axios = require('axios');

module.exports = {
	publishClaim: function(publishParams){
		console.log("publish params:>", publishParams);
		var deferred = new Promise(function(resolve, reject){
			axios.post('http://localhost:5279/lbryapi', {
				"method": "publish", 
				"params": publishParams
			})
			.then(function (response) {
				console.log(">> 'publish' success");
				resolve(response.data);
			}).catch(function(error){
				console.log(">> 'publish' error");
				reject(error);
			})
		})
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
