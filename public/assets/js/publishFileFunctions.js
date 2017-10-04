/* publish functions */

function cancelPublish () {
    window.location.href = '/';
}

// When a file is selected for publish, validate that file and
// stage it so it will be ready when the publish button is clicked.
function previewAndStageFile(selectedFile){
	const publishForm = document.getElementById('publish-form-wrapper');
    const assetPreview = document.getElementById('asset-preview-target');
    const primaryDropzone = document.getElementById('primary-dropzone-wrapper');
    const previewReader = new FileReader();
    const nameInput = document.getElementById('claim-name-input');
	const fileSelectionError = document.getElementById('input-error-file-selection');
	// validate the file's name, type, and size
	try {
		console.log('validating file');
		validateFile(selectedFile);
	} catch (error) {
		console.log('file validation failed with error:', error);
		showError(fileSelectionError, error.message);
		return;
	}
	// set the image preview, if an image was provided
    console.log('file type:', selectedFile.type)
    if (selectedFile.type !== 'video/mp4') {
		if (selectedFile.type === 'image/gif') {
            assetPreview.innerHTML = `<h2>loading preview...</h2>`
		}
		previewReader.readAsDataURL(selectedFile);
		previewReader.onloadend = function () {
            assetPreview.innerHTML = '<img id="asset-preview" src="' + previewReader.result + '" alt="image preview"/>';
		};
	} else {
        assetPreview.innerHTML = `<img id="asset-preview" src="/assets/img/black_video_play.jpg"/>`
	}
    // hide the drop zone
    primaryDropzone.hidden = true;
    publishForm.hidden = false;
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
function publishStagedFile(event) {
    const claimName = document.getElementById('claim-name-input').value;
    const channelName = document.getElementById('channel-name-select').value;
    const fileSelectionError = document.getElementById('input-error-file-selection');
    const claimNameError = document.getElementById('input-error-claim-name');
    const channelSelectError = document.getElementById('input-error-channel-select');
    const publishSubmitError = document.getElementById('input-error-publish-submit');
    // prevent default so this script can handle submission
    event.preventDefault();
	// validate, submit, and handle response
	validateFilePublishSubmission(stagedFiles, claimName, channelName)
		.then(() => {
			uploader.submitFiles(stagedFiles);
		})
		.catch(error => {
			if (error.name === 'FileError') {
                showError(fileSelectionError, error.message);
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