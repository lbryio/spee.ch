// define variables
var socket = io();
var uploader = new SocketIOFileUpload(socket);
var stagedFiles = null;

/* configure the submit button */
function publishSelectedImage(event) {
	event.preventDefault();
	// validate inputs
	var name = document.getElementById('publish-name').value;
	try {
		validateSubmission(stagedFiles, name);
	} catch (error) {
		alert(error.message);
		return;
	}
	// make sure the name is available then start the upload
	validateClaimName(name)
		.then(function() {
			uploader.submitFiles(stagedFiles); //note: must pass the file as part of an array.
		})
		.catch(function(error) {
			alert(error);
		})
};

/* socketio-file-upload listeners */
uploader.addEventListener('start', function(event){
	var name = document.getElementById('publish-name').value;
	var license = document.getElementById('publish-license').value;
	var nsfw = document.getElementById('publish-nsfw').checked;
	event.file.meta.name = name;
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
		eventAction: name
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
	document.getElementById('publish-active-area').innerHTML = '<p> --(✖╭╮✖)→ </p><p>' + JSON.stringify(msg) + '</p><strong>For help, post the above error text in the #speech channel on the <a href="https://lbry.slack.com/" target="_blank">lbry slack</a></strong>';
});

socket.on('publish-complete', function(msg){
	var publishResults;
	var showUrl = '/show/' + msg.name + '/' + msg.result.claim_id;
	// build new publish area
	publishResults = '<p>Your publish is complete! You are being redirected to it now.</p>';
	publishResults += '<p><a target="_blank" href="' + showUrl + '">If you do not get redirected, click here.</a></p>';
	// update publish area
	document.getElementById('publish-active-area').innerHTML = publishResults;
	window.location.href = showUrl;
});