/* publish functions */

function cancelPublish () {
    window.location.href = '/';
}

// When a file is selected for publish, validate that file and
// stage it so it will be ready when the publish button is clicked.
function previewAndStageFile(selectedFile){
	const publishForm = document.getElementById('publish-form');
    const assetPreview = document.getElementById('asset-preview-target');
    const primaryDropzone = document.getElementById('primary-dropzone');
    const previewReader = new FileReader();
    const nameInput = document.getElementById('claim-name-input');
	const fileSelectionInputError = document.getElementById('input-error-file-selection');
	const thumbnailSelectionTool = document.getElementById('publish-thumbnail');
    const thumbnailSelectionInput = document.getElementById('claim-thumbnail-input');
	// validate the file's name, type, and size
	try {
		validateFile(selectedFile);
	} catch (error) {
		showError(fileSelectionInputError, error.message);
		return;
	}
	// set the image preview, if an image was provided
    if (selectedFile.type !== 'video/mp4') {
		if (selectedFile.type === 'image/gif') {
            assetPreview.innerHTML = `<p>loading preview...</p>`
		}
		previewReader.readAsDataURL(selectedFile);
		previewReader.onloadend = function () {
            assetPreview.innerHTML = '<img id="asset-preview" src="' + previewReader.result + '" alt="image preview"/>';
		};
		// clear & hide the thumbnail selection input
        thumbnailSelectionInput.value = '';
		thumbnailSelectionTool.hidden = true;
	} else {
        assetPreview.innerHTML = `<img id="asset-preview" src="/assets/img/video_thumb_default.png"/>`;
        // clear & show the thumbnail selection input
        thumbnailSelectionInput.value = '';
        thumbnailSelectionTool.hidden = false;
	}
    // hide the drop zone
    primaryDropzone.setAttribute('class', 'hidden');
    publishForm.setAttribute('class', 'row')
	// set the name input value to the image name if none is set yet
	if (nameInput.value === "") {
		var filename = selectedFile.name.substring(0, selectedFile.name.indexOf('.'))
		nameInput.value = cleanseClaimName(filename);
		checkClaimName(nameInput.value);
	}
	// store the selected file for upload
	stagedFiles = [selectedFile];
}

// Validate the publish submission and then trigger upload
function publishStagedFile(event) {
    // prevent default so this script can handle submission
    event.preventDefault();
    // declare variables
    const claimName = document.getElementById('claim-name-input').value;
    let channelName = document.getElementById('channel-name-select').value;
    const fileSelectionInputError = document.getElementById('input-error-file-selection');
    const claimNameError = document.getElementById('input-error-claim-name');
    const channelSelectError = document.getElementById('input-error-channel-select');
    const publishSubmitError = document.getElementById('input-error-publish-submit');
    let anonymousOrInChannel;
    // replace channelName with 'anonymous' if appropriate
    const radios = document.getElementsByName('anonymous-or-channel');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            anonymousOrInChannel = radios[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    if (anonymousOrInChannel === 'anonymous') {
    	channelName = null;
    };
	// validate, submit, and handle response
	validateFilePublishSubmission(stagedFiles, claimName, channelName)
		.then(() => {
			publishFile(stagedFiles[0], claimName);
		})
		.catch(error => {
			if (error.name === 'FileError') {
                showError(fileSelectionInputError, error.message);
			} else if (error.name === 'NameError') {
				showError(claimNameError, error.message);
            } else if (error.name === 'ChannelNameError'){
				console.log(error);
                showError(channelSelectError, error.message);
			} else {
				showError(publishSubmitError, error.message);
			}
			return;
		})
};

var publishFile = function (file, name) {
    var uri = "/api/publish";
    var xhr = new XMLHttpRequest();
    var fd = new FormData();

	console.log('publish file, file:', file);
	console.log('publish file, name:', name);
    fd.append('file', file);
    fd.append('name', name);

    xhr.upload.addEventListener("progress", function(e) {
        if (e.lengthComputable) {
            var percentage = Math.round((e.loaded * 100) / e.total);
            console.log('progress:', percentage);
        }
    }, false);

    xhr.upload.addEventListener("load", function(e){
        console.log('loaded 100%');
    }, false);

    xhr.open("POST", uri, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText); // handle response.
        } else {
        	console.log('xhr.readyState', xhr.readyState, 'xhr.status', xhr.status);
		}
    };
    // Initiate a multipart/form-data upload
    xhr.send(fd);
}
