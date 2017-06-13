
module.exports = function(app, axios){
	// route to return claim list in json
	app.get("/api/claim_list/:claim", function(req, res){  
		var claim = req.params.claim;
		// make a call to the daemon
		axios.post('http://localhost:5279/lbryapi', {  // to do: extrapolate into lbryApi 'claim list' method and call that 
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