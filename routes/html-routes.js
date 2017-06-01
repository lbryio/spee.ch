// load dependencies
var path = require('path');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// load helpers
var lbryApi = require('../helpers/lbryApi.js');
var queueApi = require('../helpers/queueApi.js');

// routes to export
module.exports = function(app){
	// route to fetch one free public claim 
	app.get("/favicon.ico", function(req, res){
		console.log(" >> GET request on favicon.ico");
		res.sendFile(path.join(__dirname, '../public', 'favicon.ico'));
	});
	// route to fetch one free public claim 
	app.get("/:name/all", function(req, res){
    	var name = req.params.name;
		console.log(">> GET request on /" + name + " (all)");
		// create promise
		var promise = lbryApi.getAllClaims(name);
		// handle the promise resolve
		promise.then(function(orderedFreePublicClaims){
			console.log("/name/all promise success.")
			res.status(200).send(orderedFreePublicClaims); 
			return;
		})
		// handle the promise rejection
		.catch(function(error){
			console.log("/name/all/ promise error:", error);
			// handle the error
			if ((error === "NO_CLAIMS") || (error === "NO_FREE_PUBLIC_CLAIMS")){
				res.status(307).sendFile(path.join(__dirname, '../public', 'noClaims.html'));
				return;
			} else {
				res.status(400).send(error);
				return;
			};
		})
	});
	// route to fetch one free public claim 
	app.get("/:name/:claim_id", function(req, res){
		var uri = req.params.name + "#" + req.params.claim_id;
		console.log(">> GET request on /" + uri);
		// create promise
		var promise = lbryApi.getClaimBasedOnUri(uri);
		// handle the promise resolve
		promise.then(function(filePath){
			console.log("/name/claim_id promise success - filepath:", filePath)
			res.status(200).sendFile(filePath);
			return;
		})
		// handle the promise rejection
		.catch(function(error){
			console.log("/name/claim_id/ promise error:", error)
			// handle the error
			if (error === "Invalid URI") {
				res.status(400).sendFile(path.join(__dirname, '../public', 'invalidURI.html'));
				return;
			} else {
				res.status(400).send(error);
				return;
			};
		});
	});

	// route to fetch one free public claim 
	app.get("/:name", function(req, res){
		var name = req.params.name;
		console.log(">> GET request on /" + name);
		// create promise
		var promise = lbryApi.getClaimBasedOnNameOnly(name);
		// handle the promise resolve
		promise.then(function(filePath){
			console.log("/name promise success - filepath:", filePath)
			res.status(200).sendFile(filePath);
			return;
		})
		// handle the promise rejection
		.catch(function(error){
			console.log("/name/ promise error:", error);
			// handle the error
			if ((error === "NO_CLAIMS") || (error === "NO_FREE_PUBLIC_CLAIMS")){
				res.status(307).sendFile(path.join(__dirname, '../public', 'noClaims.html'));
				return;
			} else {
				res.status(400).send(error);
				return;
			};
		});
	});

	// route for the home page
	app.get("/", function(req, res){
		res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
	});

	// a catch-all route if someone visits a page that does not exist
	app.use("*", function(req, res){
		res.status(404).sendFile(path.join(__dirname, '../public', 'fourOhfour.html'));
	});
}
