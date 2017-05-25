
// routes to export
module.exports = function(app) {
	var http = require("http").Server(app);
	var io = require("socket.io")(http);

	io.on('connection', function(socket){
		console.log('a user connected');
		
		// trying to serve an image file from the server
		socket.on('image-request', function(data){
			// 1. retrieve the image from lbry via daemon
			console.log("received image request for:", data)
			// 2. emit updates as the image is being retrieved

			// 3. serve the image back once it is retrieved 
			socket.emit("image-send", "test string for: " + data);
		})

		// handle disconnect
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	});

	return http;
}