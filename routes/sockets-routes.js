module.exports = function(app) {
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	var fs = require('fs');
	var path = require('path');
	var lbryApi = require('../helpers/lbryApi.js');
	var files = {}; // for the socket uploader 

	// functions to create a publishing object
	function createPublishObject(fileInfo, filePath){
		var publishObject = {
			"method":"publish", 
			"params": {
				"name": fileInfo.name,
				"file_path": filePath,
				"bid": 0.1,
				"metadata":  {
					"description": fileInfo.description,
					"title": fileInfo.title,
					"author": fileInfo.author,
					"language": fileInfo.language,
					"license": fileInfo.license,
					"nsfw": (fileInfo.nsfw.toLowerCase() === "true")
				}
			}
		};
		return publishObject;
	}
	// publish an image to lbry 
	function publish(data, filePath){
		// 1. receive the file 

		// 2. create the publish object
		var publishObject = createPublishObject(data, filePath);
		// 3. post the task to the que
		queueApi.addNewTaskToQueue(JSON.stringify({
			type: 'publish',
			data: publishObject
		}));
		
		
	};

	io.on('connection', function(socket){
		console.log('a user connected');
		console.log("files", files)
		// socket listener for starting an upload
		socket.on('upload-start', function(data){ // data contains the variables that we passed from the client
			console.log("upload-start");
					console.log("files", files)
			var name = data['name'];
			files[name] = { // create a new entry in the files object
				fileSize: data['size'],
				data: '',
				downloaded: 0
			}
			var place = 0;
			try {  // if its a file we already tried 
				var stat = fs.statSync('Temp/' + name);
				if (stat.isFile()) {
					files[name]['downloaded'] = stat.size;
					place = stat.size / 524288;
				};
			} catch(er) {}; // if it's a new file 
			fs.open("Temp/" + name, "a", 0755, function(err, fd){
				if (err) {
					console.log("err:", err);
				} else {
					files[name]['handler'] = fd; // store the handler so we can write to it later
					socket.emit('moreData', {'place': place, percent: 0 });
				};
			});
		})
		
		socket.on('upload', function(data){
			console.log("upload");
			console.log("files", files)
			var name = data['name'];
			files[name]['downloaded'] += data['data'].length;
			files[name]['data'] += data['data'];
			if (files[name]['downloaded'] == files[name]['fileSize']) {
				fs.write(files[name]['handler'], files[name]['data'], null, 'binary', function(err, writen){
					// get thumnail here
				});
			} else if (files[name]['data'].length > 10485760) { // if data buffer reaches 10mb
				fs.write(files[name]['handler'], files[name]['data'], null, 'Binary', function(err, writen){
					files[name]['data'] = "" // reset the buffer
					var place = files[name]['donwladed'] / 524288;
					var percent = (files[name]['downloaded'] / files[Name]['fileSize']) * 100;
					socket.emit('moreData', {'place': place, 'percent': percent});
				})
			} else {
				var place = file[name]['downloaded'] / 524288;
				var percent = (files[name]['downloaded'] / files[name]['fileSize']) * 100;
				socket.emit('moreData', {'place': place, 'percent': percent});
			}
		});

		// handle disconnect
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	});

	return http;
}