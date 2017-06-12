var path = require('path');
var routeHelpers = require('../helpers/routeHelpers.js');
var lbryApi = require('../helpers/lbryApi.js');

module.exports = function(app, visitor){
	// route to fetch all free public claims 
	app.get("/:name/all", function(req, res){
		console.log(">> GET request on /" + req.params.name + " (all)");
		visitor.pageview(req.url).send();
		// create promise
		lbryApi.getAllClaims(req.params.name)
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
	// route to fetch one free public claim 
	app.get("/:name/:claim_id", function(req, res){
		
		var uri = req.params.name + "#" + req.params.claim_id;
		console.log(">> GET request on /" + uri);
		// create promise
		lbryApi.getClaimBasedOnUri(uri)
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
		
		console.log(">> GET request on /" + req.params.name);
		// create promise
		lbryApi.getClaimBasedOnNameOnly(req.params.name)
		.then(function(filePath){
			console.log("/:name success.")
			res.status(200).sendFile(filePath);
		}).catch(function(error){
			console.log("/:name error:", error);
			routeHelpers.handleRequestError(error, res);
		});
	});
	// route for the home page
	app.get("/", function(req, res){
		visitor.pageview(req.url).send();
		res.status(200).render('index');
	});
	// a catch-all route if someone visits a page that does not exist
	app.use("*", function(req, res){
		visitor.pageview(req.url).send();
		res.status(404).render('fourOhFour');
	});
}
