module.exports = function(app, path, siofu, socketHelpers) {
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	
	io.on('connection', function(socket){
		console.log('a user connected via sockets');
		// attach upload listeners
		var uploader = new siofu();
		uploader.dir = path.join(__dirname, '../../Uploads');
		uploader.listen(socket);
		uploader.on("error", function(event){
			console.log("an error occured while uploading", event.error);
			socket.emit("publish-status", event.error)
		})
		uploader.on("saved", function(event){
			console.log("saved " + event.file.name);
			if (event.file.success){
				socket.emit("publish-status", "file upload successfully completed");
				socketHelpers.publish(event.file.meta.name, event.file.pathName, event.file.meta.license, event.file.meta.nsfw, socket)
			} else {
				socket.emit("publish-failure", "file uploaded, but with errors")
			};
		});
		// handle disconnect
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	});

	return http;
}