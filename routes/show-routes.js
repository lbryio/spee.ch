
module.exports = function(app, routeHelpers, lbryApi, ua, googleAnalyticsId){
	// route to fetch all free public claims 
	app.get("/:name/all", function(req, res){
		console.log(">> GET request on /" + req.params.name + " (all)");
		ua(googleAnalyticsId, {https: true}).event("Show Routes", "/name/all", req.params.name + "/all").send();
		// create promise
		lbryApi.getAllFreePublicClaims(req.params.name)
		.then(function(orderedFreePublicClaims){
			console.log("/:name/all success.");
			res.status(200).render('allClaims', { claims: orderedFreePublicClaims });
			return;
		})
		.catch(function(error){
			console.log("/:name/all error:", error);
			routeHelpers.handleRequestError(error, res);
		})
	});
}
