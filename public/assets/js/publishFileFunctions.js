/* drop zone functions */

function drop_handler(ev) {
    ev.preventDefault();
    // if dropped items aren't files, reject them
    var dt = ev.dataTransfer;
    if (dt.items) {
        if (dt.items[0].kind == 'file') {
            var droppedFile = dt.items[0].getAsFile();
            previewAndStageFile(droppedFile);
        }
    }
}

function dragover_handler(ev) {
    ev.preventDefault();
}

function dragend_handler(ev) {
    var dt = ev.dataTransfer;
    if (dt.items) {
        for (var i = 0; i < dt.items.length; i++) {
            dt.items.remove(i);
        }
    } else {
        ev.dataTransfer.clearData();
    }
}

/* publish functions */

// update the publish status
function updatePublishStatus(msg){
    document.getElementById('publish-status').innerHTML = msg;
}

// When a file is selected for publish, validate that file and 
// stage it so it will be ready when the publish button is clicked.
function previewAndStageFile(selectedFile){ 
	var previewHolder = document.getElementById('asset-preview-holder');
	var dropzone = document.getElementById('drop-zone');
	var previewReader = new FileReader();
	var nameInput = document.getElementById('claim-name-input'); 
	// validate the file's name, type, and size
	try {
		validateFile(selectedFile);
	} catch (error) {
		showError('input-error-file-selection', error.message);
		return;
	}
	// set the image preview, if an image was provided
	if (selectedFile.type !== 'video/mp4') {
		previewReader.readAsDataURL(selectedFile);
		previewReader.onloadend = function () {
			dropzone.style.display = 'none';
			previewHolder.style.display = 'block';
			previewHolder.innerHTML = '<img width="100%" src="' + previewReader.result + '" alt="image preview"/>';
		};
	}
	// set the name input value to the image name if none is set yet
	if (nameInput.value === "") {
		var filename = selectedFile.name.substring(0, selectedFile.name.indexOf('.'))
		nameInput.value = cleanseClaimName(filename);
		checkClaimName(nameInput.value);
	}
	// store the selected file for upload
	stagedFiles = [selectedFile];
}

// Validate the publish submission and then trigger publishing.
function publishSelectedImage(event) {
	var claimName = document.getElementById('claim-name-input').value;
    var channelName = document.getElementById('channel-name-select').value;
    // prevent default so this script can handle submission
    event.preventDefault();
	// validate, submit, and handle response
	validateFilePublishSubmission(stagedFiles, claimName, channelName)
		.then(() => {
			uploader.submitFiles(stagedFiles); 
		})
		.catch(error => {
			if (error.name === 'FileError') {
                showError(document.getElementById('input-error-file-selection'), error.message);
			} else if (error.name === 'NameError') {
				showError(document.getElementById('input-error-claim-name'), error.message);
            } else if (error.name === 'ChannelNameError'){
				console.log(error);
                showError(document.getElementById('input-error-channel-select'), error.message);
			} else {
				showError(document.getElementById('input-error-publish-submit'), error.message);
			}
			return;
		})
};