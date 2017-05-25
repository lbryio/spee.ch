
// routes to export
module.exports = function(app) {
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	var fs = require('fs');
	var path = require('path');
	var lbryApi = require('../helpers/lbryApi.js');

	function sendTheImage(socket, filePath){
		fs.readFile(filePath, function(err, buff){
			if (err) {
				console.log("fs err", err);
				return;
			};
			//console.log("buff", buff);
			socket.emit('image-send', { image: true, buffer: buff.toString('base64') });
			console.log('image file has been sent via sockets');
		});
	}

	io.on('connection', function(socket){
		console.log('a user connected');
		
		// serve an image file from the server
		socket.on('image-request', function(name){
			// 1. retrieve the image from lbry via daemon
			console.log("received image request for:", name)
			var promise = lbryApi.getClaimBasedOnNameOnly(name);
			promise.then(function(data){
				console.log("socket-routes / image-request - success:", data)
				// 3. serve the image back once it is retrieved
				sendTheImage(socket, data);
			})
			.catch(function(error){
				console.log("socket-routes / image-request - error:", error)
				// handle the errors
				if (error.msg === "no claims"){
					socket.emit("image-update", "no claims were found for " + name);
				} else if (error.msg === "no free, public claims"){
					socket.emit("image-update", "no free, public claims were found for " + name);
				} else {
					socket.emit("image-update", "an unknown error occured with fetching claim");
				};
				return;
			});
				
			// 2. emit updates as the image is being retrieved
			socket.emit("image-update", "we are getting your image for " + name);
		})

		// handle disconnect
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	});

	return http;
}