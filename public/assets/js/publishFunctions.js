// update the publish status
function updatePublishStatus(msg){
	document.getElementById('publish-status').innerHTML = msg;
}
// validation function which checks the proposed file's type, size, and name
function validateFile(file) {
	if (!file) {
		throw new Error('no file provided');
	}
	// validate size and type
	switch (file.type) {
		case 'image/jpeg':
		case 'image/png':
		case 'image/gif':
			if (file.size > 5000000){
				throw new Error('Sorry, images are limitted to 5 megabytes.');
			}
			break;
		case 'video/mp4':
			if (file.size > 50000000){
				throw new Error('Sorry, videos are limitted to 50 megabytes.');
			}
			break;
		default:
			throw new Error(file.type + ' is not supported a supported file type. Only, .jpeg, .png, .gif, and .mp4 files are currently supported.')
	}
	// validate the file name (note: different from the lbry claim name)
	var invalidCharacter = /[^\w.-\s()]/g.exec(file.name);
	if (invalidCharacter) {
		throw new Error('Special characters, such as "' + invalidCharacter + '", are not allowed in the file name.');
	};
}
// validation function that checks to make sure the claim name is not already claimed
function validateClaimName (name) {
	var deferred = new Promise(function(resolve, reject) {
		// validate the characters in the 'name' field
		if (name.length < 1) {
			reject(new NameError("You must enter a name for your claim"));
			return;
		}
		var invalidCharacters = /[^A-Za-z0-9,-]/g.exec(name);
		if (invalidCharacters) {
			reject(new NameError('"' + invalidCharacters + '" is not allowed.  Use only the following characters: A-Z, a-z, 0-9, and "-"'));
			return;
		} 
		// make sure the claim name is still available
		var xhttp;
		xhttp = new XMLHttpRequest();
		xhttp.open('GET', '/api/isClaimAvailable/' + name, true);
		xhttp.responseType = 'json';
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 ) {
				if ( this.status == 200) {
					if (this.response == true) {
						resolve();
					} else {
						reject( new NameError("That name has already been claimed by spee.ch.  Please choose a different name."));
					}
				} else {
					reject("request to check claim name failed with status:" + this.status);
				};
			}
		};
		xhttp.send();
	});
	return deferred;
}
// validation function which checks all aspects of the publish submission
function validateSubmission(stagedFiles, name){
	var deferred = new Promise(function (resolve, reject) {
		// make sure only 1 file was selected
		if (!stagedFiles) {
			reject(new FileError("Please select a file"));
		} else if (stagedFiles.length > 1) {
			reject(new FileError("Only one file is allowed at a time"));
		}
		// validate the file's name, type, and size
		try {
			validateFile(stagedFiles[0]);
		} catch (error) {
			reject(error);
		}
		// make sure the claim name has not already been used
		validateClaimName(name)
			.then(function() {
				resolve();
			})
			.catch(function(error) {
				reject(error);
			})
	});
	return deferred;
}

/* publish helper functions */

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
	// set the image preview, if a preview was provided
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
		nameInput.value = filename.replace(/\s+/g, '-');;
	}
	// store the selected file for upload
	stagedFiles = [selectedFile];
}

// Validate the publish submission and then trigger publishing.
function publishSelectedImage(event) {
	event.preventDefault();
	var name = document.getElementById('claim-name-input').value;
	validateSubmission(stagedFiles, name)
		.then(function() {
			uploader.submitFiles(stagedFiles); 
		})
		.catch(function(error) {
			if (error.name === 'FileError'){
				showError('input-error-file-selection', error.message);
			} else if (error.name === 'NameError') {
				showError('input-error-claim-name', error.message);
			} else {
				showError('input-error-publish-submit', error.message);
			}
			return;
		})
};

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