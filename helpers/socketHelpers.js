var fs = require('fs');
var lbryApi = require('./lbryApi.js');
var config = require('config');
var db = require("../models");

var walledAddress = config.get('WalletConfig.lbryAddress');

function handlePublishError(error) {
	if (error.code === "ECONNREFUSED"){
		return "Connection refused.  The daemon may not be running.";
	} else if (error.response.data.error) {
		return error.response.data.error;
	} else {
		return error;
	};
}

function createPublishParams(name, filePath, license, nsfw) {
	var publishParams = {
		"name": name,
		"file_path": filePath,
		"bid": 0.01,
		"metadata":  {
			"description": name + " published via spee.ch",
			"title": name,
			"author": "spee.ch",
			"language": "en",
			"license": license,
			"nsfw": nsfw
		},
		"claim_address": walledAddress,
		"change_address": walledAddress //requires daemon 0.12.2rc1 or above
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
	publish: function(name, filePath, fileType, license, nsfw, socket, visitor) {
		nsfw = (nsfw.toLowerCase() === "true");
		// update the client
		socket.emit("publish-status", "Your image is being published (this might take a second)...");
		// send to analytics
		visitor.event("Publish Route", "Publish Request", filePath).send();
		// create the publish object
		var publishParams = createPublishParams(name, filePath, license, nsfw);
		// get a promise to publish
		lbryApi.publishClaim(publishParams, fileType)
		.then(function(result){
			visitor.event("Publish Route", "Publish Success", filePath).send();
			console.log("publish promise success. Tx info:", result)
			socket.emit("publish-complete", {name: name, result: result});
		})
		.catch(function(error){
			visitor.event("Publish Route", "Publish Failure", filePath).send();
			console.log("error:", error);
			socket.emit("publish-failure", handlePublishError(error));
			deleteTemporaryFile(filePath);
		});
	}
}