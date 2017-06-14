function serveFile(fileInfo, res){
	var options = {
		root: fileInfo.directory,
		headers: { 
			"X-Content-Type-Options": "nosniff",
			"Content-Type": fileInfo.contentType
		}
	};
	switch (fileInfo.contentType){
		case "image/jpeg":
			console.log("sending jpeg");
			break;
		case "image/gif":
			console.log("sending gif");
			break;
		case "image/png":
			console.log("sending png");
			break;
		case "video/mp4":
			console.log("sending mp4");
			break;
		default:
			console.log("sending unknown file type as .jpeg");
			options["headers"]["Content-Type"] = "image/jpeg";
			break;
	}
	console.log('options', options);
	res.status(200).sendFile(fileInfo.fileName, options);
}

module.exports = function(app, routeHelpers, lbryHelpers, ua, googleAnalyticsId){
	// route to fetch one free public claim 
	app.get("/:name/:claim_id", function(req, res){
		ua(googleAnalyticsId, {https: true}).event("Serve Route", "/name/claimId", req.params.name + "/" + req.params.claim_id).send();
		var uri = req.params.name + "#" + req.params.claim_id;
		console.log(">> GET request on /" + uri);
		// create promise
		lbryHelpers.getClaimBasedOnUri(uri)
		.then(function(fileInfo){
			console.log("/:name/:claim_id success.", fileInfo.fileName);
			serveFile(fileInfo, res);
		}).catch(function(error){
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
		.then(function(fileInfo){
			console.log("/:name success.", fileInfo.fileName);
			serveFile(fileInfo, res);
		}).catch(function(error){
			console.log("/:name error:", error);
			routeHelpers.handleRequestError(error, res);
		});
	});
}