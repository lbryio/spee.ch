var stagedFiles = null;

var publishFileFunctions = {
    triggerFileChooser: function (fileInputId) {
        document.getElementById(fileInputId).click();
    },
    cancelPublish: function () {
        window.location.href = '/';
    },
    previewAndStageFile: function (selectedFile) {
        const fileSelectionInputError = document.getElementById('input-error-file-selection');
        // When a file is selected for publish, validate that file and
        // stage it so it will be ready when the publish button is clicked
        try {
            validationFunctions.validateFile(selectedFile); // validate the file's name, type, and size
        } catch (error) {
            validationFunctions.showError(fileSelectionInputError, error.message);
            return;
        }
        // set image preview, if an image was provided
        this.setImagePreview(selectedFile);
        // hide the primary drop zone
        this.hidePrimaryDropzone();
        // set the name input value to the image name if none is set yet
        this.updateClaimNameInputWithFileName(selectedFile);
        // store the selected file for upload
        stagedFiles = [selectedFile];
    },
    hidePrimaryDropzone: function () {
        const primaryDropzone = document.getElementById('primary-dropzone');
        const publishForm = document.getElementById('publish-form');
        primaryDropzone.setAttribute('class', 'hidden');
        publishForm.setAttribute('class', 'row')
    },
    updateClaimNameInputWithFileName: function (selectedFile) {
        const nameInput = document.getElementById('claim-name-input');
        if (nameInput.value === "") {
            var filename = selectedFile.name.substring(0, selectedFile.name.indexOf('.'))
            nameInput.value = validationFunctions.cleanseClaimName(filename);
            validationFunctions.checkClaimName(nameInput.value);
        }
    },
    setImagePreview: function (selectedFile) {
        const assetPreview = document.getElementById('asset-preview-target');
        const thumbnailInput = document.getElementById('claim-thumbnail-input');
        const thumbnailInputTool = document.getElementById('publish-thumbnail');
        if (selectedFile.type !== 'video/mp4') {
            const previewReader = new FileReader();
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
    },
    returnNullOrChannel: function () {
        const channelRadio = document.getElementById('channel-radio');
        if (channelRadio.checked) {
            const channelInput = document.getElementById('channel-name-select');
            return channelInput.value.trim();
        }
        return null;
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
            channelName: this.returnNullOrChannel(),
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            license: licenseInput.value.trim(),
            nsfw: nsfwInput.checked,
            type: stagedFiles[0].type,
            thumbnail: thumbnailInput.value.trim(),
        }
    },
    appendDataToFormData: function (file, metadata) {
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
        var that = this;
        xhr.upload.addEventListener("loadstart", function(e) {
            that.showUploadStartedMessage();
        })
        xhr.upload.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
                var percentage = Math.round((e.loaded * 100) / e.total);
                console.log('progress:', percentage);
                that.showUploadProgressMessage(percentage);
            }
        }, false);
        xhr.upload.addEventListener("load", function(e){
            console.log('loaded 100%');
            that.showFilePublishUpdate("Your file has been loaded, and is now being published to the blockchain.  Sit tight...")
        }, false);
        xhr.open("POST", uri, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log('publish complete!');
                    that.showFilePublishComplete(JSON.parse(xhr.response).message);
                } else {
                    console.log(xhr.response);
                    that.showFilePublishFailure(JSON.parse(xhr.response).message);
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
        validationFunctions.validateFilePublishSubmission(stagedFiles, metadata)
            .then( function() {
                that.publishFile(stagedFiles[0], metadata);
            })
            .catch(error => {
                if (error.name === 'FileError') {
                    validationFunctions.showError(fileSelectionInputError, error.message);
                } else if (error.name === 'NameError') {
                    validationFunctions.showError(claimNameError, error.message);
                } else if (error.name === 'ChannelNameError'){
                    console.log(error);
                    validationFunctions.showError(channelSelectError, error.message);
                } else {
                    validationFunctions.showError(publishSubmitError, error.message);
                }
                return;
            })
    },
    showUploadStartedMessage: function (){
        console.log('starting upload');
        // hide the publish tool
        this.hidePublishTools();
        // show the progress status and animation
        this.showPublishStatus();
        this.showPublishProgressBar();
    },
    showUploadProgressMessage: function (percentage){
        this.updatePublishStatus('<p>File is loading to server</p>');
        this.updateUploadPercent('<p class="blue">' + percentage + '% </p>');
    },
    showFilePublishUpdate: function (msg) {
        this.updatePublishStatus('<p>' + msg + '</p>');
        this.updateUploadPercent('<p>Curious what magic is happening here? <a class="link--primary" target="blank" href="https://lbry.io/faq/what-is-lbry">Learn more.</a></p>');
    },
    showFilePublishFailure: function (msg){
        this.updatePublishStatus('<p>Something went wrong...</p><p><strong>' + msg + '</strong></p><p>For help, post the above error text in the #speech channel on the <a class="link--primary" href="https://discord.gg/YjYbwhS" target="_blank">lbry discord</a>');
        this.hidePublishProgressBar();
        this.hideUploadPercent();
    },
    showFilePublishComplete: function (msg) {
        console.log('Publish complete!');
        const showUrl = msg.lbryTx.claim_id + "/" + msg.name;
        // update status
        this.updatePublishStatus('<p>Your publish is complete! You are being redirected to it now.</p>');
        this.updateUploadPercent('<p><a class="link--primary" target="_blank" href="' + showUrl + '">If you do not get redirected, click here.</a></p>')
        // redirect the user
        window.location.href = showUrl;
    },
    hidePublishTools: function () {
        const publishFormWrapper = document.getElementById('publish-form');
        publishFormWrapper.setAttribute('class', 'hidden');
    },
    // publish status functions
    showPublishStatus: function () {
        const publishStatus = document.getElementById('publish-status');
        publishStatus.setAttribute('class', 'row row--tall flex-container--column flex-container--center-center');
    },
    updatePublishStatus: function (msg){
        const publishUpdate = document.getElementById('publish-update');
        publishUpdate.innerHTML = msg;
    },
    // progress bar functions
    showPublishProgressBar: function (){
        const publishProgressBar = document.getElementById('publish-progress-bar');
        createProgressBar(publishProgressBar, 12);
    },
    hidePublishProgressBar: function (){
        const publishProgressBar = document.getElementById('publish-progress-bar');
        publishProgressBar.hidden = true;
    },
    // upload percent functions
    updateUploadPercent: function (msg){
        const uploadPercent = document.getElementById('upload-percent');
        uploadPercent.innerHTML = msg;
    },
    hideUploadPercent: function (){
        const uploadPercent = document.getElementById('upload-percent');
        uploadPercent.hidden = true;
    },
}


