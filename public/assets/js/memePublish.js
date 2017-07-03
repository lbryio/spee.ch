
// define variables
var socket = io();
var uploader = new SocketIOFileUpload(socket);
var stagedFiles = null;
var license = 'Creative Commons';
var nsfw = false;
var nameInput = document.getElementById("publish-name");

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
	var fileName = nameInput.value + ".jpg";  //note: need to dynamically grab type
	var file = new File([blob], fileName, {type: 'image/jpeg', lastModified: Date.now()});
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
	var name = nameInput.value;
	var invalidCharacters = /[^A-Za-z0-9,-]/.exec(name);
	// validate 'name'
	if (invalidCharacters) {
		alert(invalidCharacters + ' is not allowed. A-Z, a-z, 0-9, "_" and "-" only.');
		return;
	} else if (name.length < 1) {
		alert("You must enter a name for your claim");
		return;
	}
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
	} else {
		alert("Please select a file");
	}
}

// update the publish status
function updatePublishStatus(msg){
	document.getElementById('publish-status').innerHTML = msg;
}

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
	// update the link holder
	document.getElementById('direct-link-holder').innerText = 'https://spee.ch' + directUrl;
	// enable copy-to-clipboard
	var copyBtn = document.querySelector('.copy-button');
	copyBtn.addEventListener('click', function(event) {
		// select the text
		var text = document.getElementById('direct-link-holder');
		text.select();
		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
		} catch (err) {
			alert('Oops, unable to copy');
		}
	});
});