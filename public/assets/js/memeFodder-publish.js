
// define variables
var socket = io();
var uploader = new SocketIOFileUpload(socket);
var stagedFiles = null;
var license = 'Creative Commons';
var nsfw = false;
var nameInput = document.getElementById("publish-name");

/* socketio-file-upload listeners */
uploader.addEventListener('start', function(event){
	event.file.meta.name = nameInput.value;
	event.file.meta.license = license;
	event.file.meta.nsfw = nsfw;
	event.file.meta.type = stagedFiles[0].type;
	// re-set the html in the publish area
	document.getElementById('publish-active-area').innerHTML = '<div id="publish-status"></div><div id="progress-bar"></div>';
	// start a progress animation
	createProgressBar(document.getElementById('progress-bar'), 12);
	// google analytics
	ga('send', {
		hitType: 'event',
		eventCategory: 'publish',
		eventAction: nameInput.value
	});
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
	document.getElementById('publish-active-area').innerHTML = '<p>' + JSON.stringify(msg) + '</p><p> --(✖╭╮✖)→ </p><strong>For help, post the above error text in the #speech channel on the <a href="https://lbry.slack.com/" target="_blank">LBRY slack</a></strong>';
});
socket.on('publish-complete', function(msg){
	var publishResults;
	var directUrl = '/' + msg.name + '/' + msg.result.claim_id;
	// build new publish area
	publishResults = '<p>Your publish is complete! View it here:</p>';
	publishResults += '<p><a target="_blank" href="' + directUrl + '">spee.ch' + directUrl + '</a></p>';
	publishResults += '<p><button class="copy-button">Copy to clipboard</button></p>';
	publishResults += '<p><a target="_blank" href="https://explorer.lbry.io/#!/transaction/' + msg.result.txid + '">View the transaction details</a></p>';
	publishResults += '<a href="/meme-fodder/play"><button>Reload</button></a></p>';
	// update publish area
	document.getElementById('publish-active-area').innerHTML = publishResults;
});