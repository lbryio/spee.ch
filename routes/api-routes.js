// require dependencies 
var path = require('path');
var axios = require('axios');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// import helpers
var lbryApi = require('../helpers/lbryApi.js');
var queueApi = require('../helpers/queueApi.js');

module.exports = function(app){
	// route to return claim list in json
	app.get("/claim_list/:claim", function(req, res){
		var claim = req.params.claim;
		// make a call to the daemon
		axios.post('http://localhost:5279/lbryapi', {
				method: "claim_list",
				params: {
					name: claim
				}
			}
		).then(function (response) {
			console.log("success");
			res.send(response.data);
		}).catch(function(error){
			console.log(error.data);
			res.send(error.data);
		})
	});
}