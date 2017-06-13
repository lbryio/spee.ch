module.exports = function(app, routeHelpers, lbryHelpers, ua, googleAnalyticsId){
	// route to fetch one free public claim 
	app.get("/:name/:claim_id", function(req, res){
		ua(googleAnalyticsId, {https: true}).event("Serve Route", "/name/claimId", req.params.name + "/" + req.params.claim_id).send();
		var uri = req.params.name + "#" + req.params.claim_id;
		console.log(">> GET request on /" + uri);
		// create promise
		lbryHelpers.getClaimBasedOnUri(uri)
		.then(function(filePath){
			console.log("/:name/:claim_id success.");
			res.status(200).sendFile(filePath);
		})
		.catch(function(error){
			console.log("/:name/:claim_id error:", error)
			routeHelpers.handleRequestError(error, res);
		});
	});
	// route to fetch one free public claim 
	app.get("/:name", function(req, res){
		ua(googleAnalyticsId, {https: true}).event("Serve Route", "/name", req.params.name).send();
		console.log(">> GET request on /" + req.params.name);
		// create promise
		lbryHelpers.getClaimBasedOnNameOnly(req.params.name)
		.then(function(filePath){
			console.log("/:name success.")
			res.status(200).sendFile(filePath);
		}).catch(function(error){
			console.log("/:name error:", error);
			routeHelpers.handleRequestError(error, res);
		});
	});
}