// update the publish status
function updatePublishStatus(msg){
	document.getElementById('publish-status').innerHTML = msg;
}

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
			throw new Error('The ' + file.Type + ' content type is not supported.  Only, .jpeg, .png, .gif, and .mp4 files are currently supported.')
	}
}

function validateSubmission(stagedFiles, name){
	// make sure only 1 file was selected
	if (!stagedFiles) {
		throw new Error("Please select a file");
	} else if (stagedFiles.length > 1) {
		throw new Error("Only one file is allowed at a time");
	}
	// validate 'name' field
	var invalidCharacters = /[^A-Za-z0-9,-]/.exec(name);
	if (invalidCharacters) {
		throw new Error(invalidCharacters + ' is not allowed. A-Z, a-z, 0-9, and "-" only.');
	} else if (name.length < 1) {
		throw new Error("You must enter a name for your claim");
	}
}

/* regular publish helper functions */

function previewAndStageFile(selectedFile){ 
	var preview = document.getElementById('asset-preview-holder');
	var dropzone = document.getElementById('drop-zone');
	var previewReader = new FileReader();
	var nameInput = document.getElementById('publish-name'); 
	// set the preview after reading the asset
	previewReader.onloadend = function () {
		preview.style.display = 'block';
		dropzone.style.display = 'none';
		if (selectedFile.type === 'video/mp4') {
			preview.innerHTML = '<video controls width="100%"><source src="' + previewReader.result + '" alt="video preview"/></video>';
		} else {
			preview.innerHTML = '<img width="100%" src="' + previewReader.result + '" alt="image preview"/>';
		}
	};
	// validate the file
	try {
		validateFile(selectedFile);
	} catch (error) {
		alert(error.message);
		return;
	}
	// read the data (when completed, it will trigger the asset preview)
	previewReader.readAsDataURL(selectedFile); 
	// set the name input value to the image name if none is set yet
	if (nameInput.value === "") {
		nameInput.value = selectedFile.name.substring(0, selectedFile.name.indexOf('.'));
	}
	// store the selected file for upload
	stagedFiles = [selectedFile];
}

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

/* meme publish functions */

function startPublish() {
	//download the image 
    var dataUrl = canvas.toDataURL('image/jpeg');  // canvas defined in memeDraw.js
	var blob = dataURItoBlob(dataUrl)
	var fileName = nameInput.value + ".jpeg";  //note: need to dynamically grab type
	var file = new File([blob], fileName, {type: 'image/jpeg', lastModified: Date.now()});
	stageAndPublish(file); 
};

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