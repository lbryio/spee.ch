var errorHandlers = require("../helpers/libraries/errorHandlers.js");
var showController = require("../controllers/showController.js");

module.exports = function(app, ua, googleAnalyticsId){
	// route to fetch all free public claims
	app.get("/:name/all", function(req, res){
		console.log(">> GET request on /" + req.params.name + "/all");
		// google analytics
		ua(googleAnalyticsId, {https: true}).event("Show Routes", "/name/all", req.params.name + "/all").send();
		// fetch all free public claims
		showController.getAllClaims(req.params.name)
		.then(function(orderedFreePublicClaims){
			console.log("/:name/all success.");
			res.status(200).render('allClaims', { claims: orderedFreePublicClaims });
			return;
		})
		.catch(function(error){
			console.log("/:name/all error:", error);
			errorHandlers.handleRequestError(error, res);
		})
	});
}
