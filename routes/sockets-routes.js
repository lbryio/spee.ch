module.exports = function(app) {
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	var fs = require('fs');
	var path = require('path');
	var lbryApi = require('../helpers/lbryApi.js');
	var queueApi = require('../helpers/queueApi.js');
	var siofu = require("socketio-file-upload");

	// functions to create a publishing object
	function createPublishParams(name, filepath, license, nsfw){
		var publishParams = {
			"name": name,
			"file_path": filepath,
			"bid": 0.1,
			"metadata":  {
				"description": name + " published via spee.ch",
				"title": name,
				"author": "spee.ch",
				"language": "en",
				"license": license,
				"nsfw": (nsfw.toLowerCase() === "true")
			}
		};
		return publishParams;
	}
	// publish an image to lbry 
	function publish(name, filepath, license, nsfw, socket){
		// update the client
		socket.emit("publish-status", "Your image is being published (this might take a second)...");
		// create the publish object
		var publishParams = createPublishParams(name, filepath, license, nsfw);
		// get a promise to publish
		var promise = lbryApi.publishClaim(publishParams);
		// handle promise
		promise.then(function(data){
			console.log("publish promise success. Tx info:", data)
			socket.emit("publish-complete", data);
			/* 
				note: remember to delete the local file
			*/
		})
		.catch(function(error){
			console.log("error:", error);
			socket.emit("publish-status", "publish failed");
			/* 
				note: remember to delete the local file
			*/
		});
	};

	io.on('connection', function(socket){
		console.log('a user connected');
		// listener for uploader
		var uploader = new siofu();
		uploader.dir = path.join(__dirname, '../../Uploads');
		uploader.listen(socket);
		// attach upload listeners
		uploader.on("error", function(event){
			console.log("an error occured while uploading", event.error);
			socket.emit("publish-status", event.error)
		})
		uploader.on("saved", function(event){
			console.log("saved " + event.file.name);
			if (event.file.success){
				socket.emit("publish-status", "file upload successfully completed");
				publish(event.file.meta.name, event.file.pathName, event.file.meta.license,event.file.meta.nsfw, socket)
			} else {
				socket.emit("publish-status", "file saved, but with errors")
			};
		});

		// handle disconnect
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	});

	return http;
}