var fs = require('fs');
var lbryApi = require('../helpers/libraries/lbryApi.js');
var config = require('config');
var errorHandlers = require("../helpers/libraries/errorHandlers.js");

var walledAddress = config.get('WalletConfig.lbryAddress');

function createPublishParams(claim, filePath, license, nsfw) {
	console.log("nsfw:", nsfw, typeof nsfw);
	var publishParams = {
		"name": claim,
		"file_path": filePath,
		"bid": 0.01,
		"metadata":  {
			"description": claim + " published via spee.ch",
			"title": claim,
			"author": "spee.ch",
			"language": "en",
			"license": license,
			"nsfw": (nsfw.toLowerCase() === "on")
		},
		"claim_address": walledAddress,
		"change_address": walledAddress
	};
	return publishParams;
}

function deleteTemporaryFile(filePath) {
	fs.unlink(filePath, function(err) {
		if (err) throw err;
		console.log('successfully deleted ' + filePath);
	});
}

module.exports = {
	publish: function(claim, fileName, filePath, fileType, license, nsfw, socket, visitor) {
		// update the client
		socket.emit("publish-status", "Your image is being published (this might take a second)...");
		// send to analytics
		visitor.event("Publish Route", "Publish Request", filePath).send();
		// create the publish object
		var publishParams = createPublishParams(claim, filePath, license, nsfw);
		// get a promise to publish
		lbryApi.publishClaim(publishParams, fileName, fileType)
		.then(function(result){
			visitor.event("Publish Route", "Publish Success", filePath).send();
			console.log("publish promise success. Tx info:", result)
			socket.emit("publish-complete", {name: claim, result: result});
		})
		.catch(function(error){
			visitor.event("Publish Route", "Publish Failure", filePath).send();
			console.log("error:", error);
			socket.emit("publish-failure", errorHandlers.handlePublishError(error));
			deleteTemporaryFile(filePath);
		});
	}
}