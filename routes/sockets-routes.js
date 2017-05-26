module.exports = function(app) {
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	var fs = require('fs');
	var path = require('path');
	var lbryApi = require('../helpers/lbryApi.js');

	function sendTheImage(socket, filePath){
		fs.readFile(filePath, function(err, buff){
			if (err) {
				console.log("socket: fs err:", err);
				return;
			};
			//console.log("buff", buff);
			socket.emit('claim-send', { image: true, buffer: buff.toString('base64') });
			console.log('socket: the image file has been sent via sockets');
		});
	}

	io.on('connection', function(socket){
		console.log('a user connected');
		
		// serve an image file from the server
		socket.on('claim-request', function(query){
			// 1. retrieve the image from lbry via daemon
			console.log("socket: received claim request for:", query)
			if (query.indexOf("/") === -1){
				var promise = lbryApi.getClaimBasedOnNameOnly(query)
			} else {
				var uri = query.replace("/", "#");
				var promise = lbryApi.getClaimBasedOnUri(uri)
			}
			promise.then(function(data){
				console.log("socket: claim-request - success:", data)
				// 3. serve the image back once it is retrieved
				sendTheImage(socket, data);
				return;
			})
			.catch(function(error){
				console.log("socket: claim-request - error:", error)
				// handle the error
				socket.emit("claim-update", error);
				return;
			});
				
			// 2. emit updates as the image is being retrieved
			socket.emit("claim-update", "We are getting your claim for " + query);
		})

		// handle disconnect
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	});

	return http;
}