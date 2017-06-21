
// define variables
var socket = io();
var uploader = new SocketIOFileUpload(socket);
var stagedFiles = null;
var name = 'meme-fodder-entry';
var license = 'Creative Commons';
var nsfw = false;

/* helper functions */
// create a progress animation
function createProgressBar(element, size){ 
	var x = 1;
	var adder = 1;
	function addOne(){
		var bars = '<p>|';
		for (var i = 0; i < x; i++){ bars += ' | '; }
		bars += '</p>';
		element.innerHTML = bars;
		if (x === size){
			adder = -1;
		} else if ( x === 0){
			adder = 1;
		}
		x += adder;
	};
	setInterval(addOne, 300);
}

function publishMeme(file) {
	// get image data
	//var imgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
	//console.log(imgData);
	// stage files 
	stagedFiles = [file]; // stores the selected file for upload
	//stagedFiles = [selectedFile.getAsFile()]; // stores the selected file for upload
	console.log(stagedFiles[0]);
	console.log('file staged');
	// make sure a file was selected
	if (stagedFiles) {
		// make sure only 1 file was selected
		if (stagedFiles.length > 1) {
			alert("Only one file allowed at a time");
			return;
		}
		// make sure the content type is acceptable
		switch (stagedFiles[0].type) {
			case "image/png":
			case "image/jpeg":
			case "image/gif":
			case "video/mp4":
				uploader.submitFiles(stagedFiles);
				break;
			default:
				alert("Only .png, .jpeg, .gif, and .mp4 files are currently supported");
				break;
		}
	}

}

// update the publish status
function updatePublishStatus(msg){
	document.getElementById('publish-status').innerHTML = msg;
}

/* socketio-file-upload listeners */
uploader.addEventListener('start', function(event){
	event.file.meta.name = name;
	event.file.meta.license = license;
	event.file.meta.nsfw = nsfw;
	event.file.meta.type = stagedFiles[0].type;
	// re-set the html in the publish area
	document.getElementById('publish-active-area').innerHTML = '<div id="publish-status"></div><div id="progress-bar"></div>';
	// start a progress animation
	createProgressBar(document.getElementById('progress-bar'), 12);
});
uploader.addEventListener('progress', function(event){
	var percent = event.bytesLoaded / event.file.size * 100;
	updatePublishStatus('File is ' + percent.toFixed(2) + '% loaded to the server');
});

/* socket.io message listeners */
socket.on('publish-status', function(msg){
	updatePublishStatus(msg);
});
socket.on('publish-failure', function(msg){
	document.getElementById('publish-active-area').innerHTML = '<p>' + JSON.stringify(msg) + '</p><p> --(✖╭╮✖)→ </p><strong>For help, post the above error text in the #speech channel on the <a href="https://lbry.slack.com/" target="_blank">lbry slack</a></strong>';
});
socket.on('publish-complete', function(msg){
	var publishResults = '<p>Your publish is complete!</p>';
	publishResults += '<p><strong>NOTE: the blockchain will need a few minutes to process your amazing work.  Please allow some time for your asset to appear in the entries below.</strong></p>';
	publishResults += '<p>Your meme has been published to <a target="_blank" href="/' + msg.name + '">spee.ch/' + msg.name + '</a></p>';
	publishResults += '<p>Here is a direct link to where your meme will be stored: <a target="_blank" href="/' + msg.name + '/' + msg.result.claim_id + '">spee.ch/' + msg.name + '/' + msg.result.claim_id + '</a></p>';
	publishResults += '<p>Your Transaction ID is: <a target="_blank" href="https://explorer.lbry.io/#!/transaction?id=' + msg.result.txid + '">' + msg.result.txid + '</a></p>';
	publishResults += '<p><a href="/meme-fodder/play">Reload to publish another</a></p>';
	document.getElementById('publish-active-area').innerHTML = publishResults; 
});