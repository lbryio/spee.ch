// update the publish status
function updatePublishStatus(msg){
	document.getElementById('publish-status').innerHTML = msg;
}

/* regular publish helper functions */

function previewAndStageFile(selectedFile){ 
	var preview = document.getElementById('image-preview');
	var dropzone = document.getElementById('drop-zone');
	var previewReader = new FileReader();
	var nameInput = document.getElementById('publish-name'); 

	preview.style.display = 'block';
	dropzone.style.display = 'none';
	
	previewReader.onloadend = function () {
		preview.src = previewReader.result;
	};

	if (selectedFile) {
		previewReader.readAsDataURL(selectedFile); // reads the data and sets the img src
		if (nameInput.value === "") {
			nameInput.value = selectedFile.name.substring(0, selectedFile.name.indexOf('.'));
		}
		stagedFiles = [selectedFile]; // stores the selected file for upload
	} else {
		preview.src = '';
	}
}

/* drop zone function s*/

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
	var fileName = nameInput.value + ".jpg";  //note: need to dynamically grab type
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