/* publish functions */

let stagedFiles = null;

const previewReader = new FileReader();

function triggerFileChooser(fileInputId) {
    document.getElementById(fileInputId).click();
}

function setImagePreview (selectedFile) {
    const assetPreview = document.getElementById('asset-preview-target');
    const thumbnailInput = document.getElementById('claim-thumbnail-input');
    const thumbnailInputTool = document.getElementById('publish-thumbnail');
    if (selectedFile.type !== 'video/mp4') {
        if (selectedFile.type === 'image/gif') {
            assetPreview.innerHTML = `<p>loading preview...</p>`
        }
        previewReader.readAsDataURL(selectedFile);
        previewReader.onloadend = function () {
            assetPreview.innerHTML = '<img id="asset-preview" src="' + previewReader.result + '" alt="image preview"/>';
        };
        // clear & hide the thumbnail selection input
        thumbnailInput.value = '';
        thumbnailInputTool.hidden = true;
    } else {
        assetPreview.innerHTML = `<img id="asset-preview" src="/assets/img/video_thumb_default.png"/>`;
        // clear & show the thumbnail selection input
        thumbnailInput.value = '';
        thumbnailInputTool.hidden = false;
    }
}

function hidePrimaryDropzone () {
    const primaryDropzone = document.getElementById('primary-dropzone');
    const publishForm = document.getElementById('publish-form');
    primaryDropzone.setAttribute('class', 'hidden');
    publishForm.setAttribute('class', 'row')
}

function updateClaimNameInputWithFileName (selectedFile) {
    const nameInput = document.getElementById('claim-name-input');
    if (nameInput.value === "") {
        var filename = selectedFile.name.substring(0, selectedFile.name.indexOf('.'))
        nameInput.value = cleanseClaimName(filename);
        checkClaimName(nameInput.value);
    }
}

function previewAndStageFile(selectedFile){
    const fileSelectionInputError = document.getElementById('input-error-file-selection');
    // When a file is selected for publish, validate that file and
    // stage it so it will be ready when the publish button is clicked
	try {
		validateFile(selectedFile); // validate the file's name, type, and size
	} catch (error) {
		showError(fileSelectionInputError, error.message);
		return;
	}
    // set image preview, if an image was provided
	setImagePreview(selectedFile);
    // hide the primary drop zone
    hidePrimaryDropzone();
    // set the name input value to the image name if none is set yet
    updateClaimNameInputWithFileName(selectedFile);
    // store the selected file for upload
	stagedFiles = [selectedFile];
}

function cancelPublish () {
    window.location.href = '/';
}

var publishFileFunctions = {
    returnNullOrChannel: function () {
        const channelInput = document.getElementById('channel-name-select');
        const radios = document.getElementsByName('anonymous-or-channel');
        let anonymousOrInChannel;
        // replace channelName with 'anonymous' if appropriate
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                anonymousOrInChannel = radios[i].value; // do whatever you want with the checked radio
                break; // only one radio can be logically checked, don't check the rest
            }
        }
        if (anonymousOrInChannel === 'anonymous') {
            return null;
        };
        return channelInput.value.trim();
    },
    createMetadata: function() {
        const nameInput = document.getElementById('claim-name-input');
        const titleInput = document.getElementById('publish-title');
        const descriptionInput = document.getElementById('publish-description');
        const licenseInput = document.getElementById('publish-license');
        const nsfwInput = document.getElementById('publish-nsfw');
        const thumbnailInput = document.getElementById('claim-thumbnail-input');

        return {
            name: nameInput.value.trim(),
            channel: this.returnNullOrChannel(),
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            license: licenseInput.value.trim(),
            nsfw: nsfwInput.checked,
            type: stagedFiles[0].type,
            thumbnail: thumbnailInput.value.trim()
        }
    },
    appendDataToFormData: function (file, metadata) {
        console.log(metadata);
        var fd = new FormData();
        fd.append('file', file)
        for (var key in metadata) {
            if (metadata.hasOwnProperty(key)) {
                console.log(key, metadata[key]);
                fd.append(key, metadata[key]);
            }
        }
        return fd;
    },
    publishFile: function (file, metadata) {
        var uri = "/api/publish";
        var xhr = new XMLHttpRequest();
        var fd = this.appendDataToFormData(file, metadata);
        xhr.upload.addEventListener("loadstart", function(e) {
            showUploadStartedMessage();
        })
        xhr.upload.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
                var percentage = Math.round((e.loaded * 100) / e.total);
                console.log('progress:', percentage);
                showUploadProgressMessage(percentage);
            }
        }, false);
        xhr.upload.addEventListener("load", function(e){
            console.log('loaded 100%');
            showFilePublishUpdate("Your file has been loaded, and is now being published to the blockchain.  Sit tight...")
        }, false);
        xhr.open("POST", uri, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    alert(xhr.responseText); // handle response.
                    showFilePublishComplete(xhr.responseText);
                } else {
                    showFilePublishFailure(xhr.responseText);
                }
            } else {
                console.log('xhr.readyState', xhr.readyState, 'xhr.status', xhr.status);
            }
        };
        // Initiate a multipart/form-data upload
        xhr.send(fd);
    },
    // Validate the publish submission and then trigger upload
    publishStagedFile: function (event) {
        event.preventDefault();  // prevent default so this script can handle submission
        const metadata = this.createMetadata();
        const that = this; // note: necessary ?
        const fileSelectionInputError = document.getElementById('input-error-file-selection');
        const claimNameError = document.getElementById('input-error-claim-name');
        const channelSelectError = document.getElementById('input-error-channel-select');
        const publishSubmitError = document.getElementById('input-error-publish-submit');
        // validate, submit, and handle response
        validateFilePublishSubmission(stagedFiles, metadata)
            .then( function() {
                that.publishFile(stagedFiles[0], metadata);
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
    },
}

function showUploadStartedMessage (){
    console.log('starting upload');
    // hide the publish tool
    hidePublishTools();
    // show the progress status and animation
    showPublishStatus();
    showPublishProgressBar();
};
function showUploadProgressMessage (percentage){
    updatePublishStatus('<p>File is loading to server</p>')
    updateUploadPercent(`<p class="blue">${percentage}%</p>`)
};
function showFilePublishUpdate (msg) {
    updatePublishStatus(`<p>${msg}</p>`);
    updateUploadPercent(`<p>Curious what magic is happening here? <a class="link--primary" target="blank" href="https://lbry.io/faq/what-is-lbry">Learn more.</a></p>`);
};
function showFilePublishFailure (msg){
    updatePublishStatus('<p> --(✖╭╮✖)→ </p><p>' + JSON.stringify(msg) + '</p><strong>For help, post the above error text in the #speech channel on the <a class="link--primary" href="https://discord.gg/YjYbwhS" target="_blank">lbry discord</a></strong>');
    hidePublishProgressBar();
    hideUploadPercent();
};
function showFilePublishComplete (msg) {
    console.log('Publish complete! message:', msg);
    const showUrl = msg.result.claim_id + "/" + msg.name;
    // update status
    updatePublishStatus('<p>Your publish is complete! You are being redirected to it now.</p>');
    updateUploadPercent('<p><a class="link--primary" target="_blank" href="\' + showUrl + \'">If you do not get redirected, click here.</a></p>')
    // redirect the user
    // window.location.href = showUrl;
};

function hidePublishTools() {
    const publishFormWrapper = document.getElementById('publish-form');
    publishFormWrapper.setAttribute('class', 'hidden');
}
// publish status functions
function showPublishStatus() {
    const publishStatus = document.getElementById('publish-status');
    publishStatus.setAttribute('class', 'row row--tall flex-container--column flex-container--center-center');
}
function updatePublishStatus(msg){
    const publishUpdate = document.getElementById('publish-update');
    publishUpdate.innerHTML = msg;
}
// progress bar functions
function showPublishProgressBar(){
    const publishProgressBar = document.getElementById('publish-progress-bar');
    createProgressBar(publishProgressBar, 12);
}
function hidePublishProgressBar(){
    const publishProgressBar = document.getElementById('publish-progress-bar');
    publishProgressBar.hidden = true;
}
// upload percent functions
function updateUploadPercent(msg){
    const uploadPercent = document.getElementById('upload-percent');
    uploadPercent.innerHTML = msg;
}
function hideUploadPercent(){
    const uploadPercent = document.getElementById('upload-percent');
    uploadPercent.hidden = true;
}