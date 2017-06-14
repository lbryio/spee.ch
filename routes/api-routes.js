
module.exports = function(app, routeHelpers, lbryApi){
	// route to run a claim_list request on the daemon
	app.get("/api/claim_list/:claim", function(req, res){
		lbryApi.getClaimsList(req.params.claim)
		.then(function(orderedFreePublicImages){
			console.log("/api/claim_list/:claim success.");
			res.status(200).json(orderedFreePublicImages);
		})
		.catch(function(error){
			console.log("/api/claim_list/:name error:", error);
			routeHelpers.handleRequestError(error, res);
		});
	});
	// route to run a resolve request on the daemon
	app.get("/api/resolve/:uri", function(req, res){
		lbryApi.resolveUri(req.params.uri)
		.then(function(resolvedUri){
			console.log("/api/resolve/:claim success.");
			res.status(200).json(resolvedUri);
		}).catch(function(error){
			routeHelpers.handleRequestError(error, res);
		});
	});
	
}