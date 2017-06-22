
// define variables
var socket = io();
var uploader = new SocketIOFileUpload(socket);
var stagedFiles = null;
var license = 'Creative Commons';
var nsfw = false;
var claimName;

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

function startPublish() {
	//download the image 
    var dataUrl = canvas.toDataURL('image/jpeg');  // canvas defined in memeDraw.js
	var blob = dataURItoBlob(dataUrl)
	claimName = claimNameInput.value;  // claimNameInput.value defined in memeDraw.js
	var fileName = claimNameInput.value + ".jpg";
	var file = new File([blob], fileName, {type: 'image/jpeg', lastModified: Date.now()});
	console.log(file);
	stageAndPublish(file); 
};

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

function stageAndPublish(file) {
	// stage files 
	stagedFiles = [file]; // stores the selected file for 
	// make sure a file was selected
	if (stagedFiles) {
		// make sure only 1 file was selected
		if (stagedFiles.length < 1) {
			alert("A file is needed");
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
	event.file.meta.name = claimName;
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
	document.getElementById('publish-active-area').innerHTML = '<p>' + JSON.stringify(msg) + '</p><p> --(✖╭╮✖)→ </p><strong>For help, post the above error text in the #speech channel on the <a href="https://lbry.slack.com/" target="_blank">LBRY slack</a></strong>';
});
socket.on('publish-complete', function(msg){
	var publishResults;
	var directUrl = '/' + msg.name + '/' + msg.result.claim_id;
	// build new publish area
	publishResults = '<p><span id="tweet-meme-button"></span>Your publish is complete! Go ahead, share it with the world!</p>';
	publishResults += '<p>Check it out, here: <a target="_blank" href="' + directUrl + '">view it here!</a></p>';
	publishResults += '<p><a target="_blank" href="https://explorer.lbry.io/#!/transaction/' + msg.result.txid + '">View the transaction details</a></p>';
	publishResults += '<a href="/"><button>Reload</button></a></p>';
	// update publish area
	document.getElementById('publish-active-area').innerHTML = publishResults;
	// add a tweet button
	twttr.widgets
		.createShareButton(
			document.getElementById('tweet-meme-button'),
			{
				text: 'Check out my meme creation on the LBRY blockchain!',
				url: 'https://spee.ch/' + directUrl,
				hashtags: 'MemeFodder',
				via: 'lbryio'
			})
		.then( function( el ) {
			console.log('Tweet button added.');
		});
});