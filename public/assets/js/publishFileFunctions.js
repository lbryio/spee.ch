var stagedFiles = null;

const publishFileFunctions = {
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
        const channelName = this.returnNullOrChannel();
        let metadata = {
            name: nameInput.value.trim(),
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            license: licenseInput.value.trim(),
            nsfw: nsfwInput.checked,
            type: stagedFiles[0].type,
            thumbnail: thumbnailInput.value.trim(),
        };
        if (channelName) {
            metadata['channelName'] = channelName;
        }
        return metadata;
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
        var uri = "/api/claim-publish";
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
              console.log('publish response:', xhr.response)
                if (xhr.status == 200) {
                  console.log('publish complete!');
                  that.showFilePublishComplete(JSON.parse(xhr.response).message);
                } else if (xhr.status == 502){
                  that.showFilePublishFailure('Spee.ch was not able to get a response from the LBRY network.');
                } else {
                  that.showFilePublishFailure(JSON.parse(xhr.response).message);
                }
            }
        };
        // Initiate a multipart/form-data upload
        xhr.send(fd);
    },
    // Validate the publish submission and then trigger upload
    publishStagedFile: function (event) {
        event.preventDefault();  // prevent default so this script can handle submission
        const metadata = this.createMetadata();
        const that = this;
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
}


