// define variables
var socket = io();
var uploader = new SocketIOFileUpload(socket);
var stagedFiles = null;

/* configure the submit button */
document.getElementById('publish-submit').addEventListener('click', function(event){
	event.preventDefault();
	var name = document.getElementById('publish-name').value;
	var invalidCharacters = /[^A-Za-z0-9,-]/.exec(name);
	// validate 'name' field
	if (invalidCharacters) {
		alert(invalidCharacters + ' is not allowed. A-Z, a-z, 0-9, and "-" only.');
		return;
	} else if (name.length < 1) {
		alert("You must enter a name for your claim");
		return;
	}
	// make sure only 1 file was selected
	if (!stagedFiles) {
		alert("Please select a file");
		return;
	} else if (stagedFiles.length > 1) {
		alert("Only one file is allowed at a time");
		return;
	}
	// make sure the content type is acceptable
	switch (stagedFiles[0].type) {
		case "image/png":
		case "image/jpeg":
		case "image/gif":
		case "video/mp4":
			break;
		default:
			alert("Only .png, .jpeg, .gif, and .mp4 files are currently supported");
			return;
	}
	// make sure the name is available
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.open('GET', '/api/isClaimAvailable/' + name, true);
	xhttp.responseType = 'json';
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 ) {
			if ( this.status == 200) {
				if (this.response == true) {
					uploader.submitFiles(stagedFiles);
				} else {
					alert("That name has already been claimed by spee.ch.  Please choose a different name.");
				}
			} else {
				console.log("request to check claim name failed with status:", this.status);
			};
		}
	};
	xhttp.send();
})

/* socketio-file-upload listeners */
uploader.maxFileSize = 5000000;
uploader.addEventListener("error", function(data){
    if (data.code === 1) {
        alert("Sorry, uploading is limitted to 5 megabytes.");
    }
});
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
	document.getElementById('publish-active-area').innerHTML = '<p>' + JSON.stringify(msg) + '</p><p> --(✖╭╮✖)→ </p><strong>For help, post the above error text in the #speech channel on the <a href="https://lbry.slack.com/" target="_blank">lbry slack</a></strong>';
});

socket.on('publish-complete', function(msg){
	var publishResults;
	var directUrl = '/' + msg.name + '/' + msg.result.claim_id;
	// build new publish area
	publishResults = '<p>Your publish is complete! You are being redicted to it</p>';
	publishResults += '<p><a target="_blank" href="' + directUrl + '">if you do not get redirected, click here</a></p>';
	// update publish area
	document.getElementById('publish-active-area').innerHTML = publishResults;
	window.location.href = directUrl;
});