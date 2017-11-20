const dropzoneFunctions = {
    triggerFileChooser: function (fileInputId) {
        document.getElementById(fileInputId).click();
    },
    dragover_handler: function (event) {
        event.preventDefault();
    },
    dragend_handler: function (event) {
        var dt = event.dataTransfer;
        if (dt.items) {
            for (var i = 0; i < dt.items.length; i++) {
                dt.items.remove(i);
            }
        } else {
            event.dataTransfer.clearData();
        }
    },
    validateAndSelectDroppedItem: function(event, that) {
        var dt = event.dataTransfer;
        if (dt.items) {
            if (dt.items[0].kind == 'file') {
                var droppedFile = dt.items[0].getAsFile();
                that.selectFile(droppedFile, that);
            } else {
                that.showError('Only files may be dropped');
            }
        }
    },
    validateAndPreviewFile: function(selectedFile, that) {
        try {
            validationFunctions.validateFile(selectedFile); // validate the file's name, type, and size
        } catch (error) {
            that.showError(error.message);
            return;
        }
        publishFileFunctions.previewAndStageFile(selectedFile);
        // hide any errors from previous invalid files
        if (that.hideError) {that.hideError();}
    },
    primary: {
        drop_handler: function (event) {
            event.preventDefault();
            this.dragexit_handler();
            dropzoneFunctions.validateAndSelectDroppedItem(event, this);
        },
        selectFile(selectedFile, that){
            dropzoneFunctions.validateAndPreviewFile(selectedFile, that);
        },
        dragenter_handler: function () {
            var primaryDropzone = document.getElementById('primary-dropzone');
            primaryDropzone.setAttribute('class', 'dropzone dropzone--drag-over row row--margined row--padded row--tall flex-container--column flex-container--center-center');
            primaryDropzone.firstElementChild.setAttribute('class', 'hidden');
            primaryDropzone.lastElementChild.setAttribute('class', '');

        },
        dragexit_handler: function () {
            var primaryDropzone = document.getElementById('primary-dropzone');
            primaryDropzone.setAttribute('class', 'dropzone row row--tall row--margined row--padded flex-container--column flex-container--center-center');
            primaryDropzone.firstElementChild.setAttribute('class', '');
            primaryDropzone.lastElementChild.setAttribute('class', 'hidden');
        },
        showError: function (errorMsg) {
            const errorDisplay = document.getElementById('input-error-file-selection');
            errorDisplay.hidden = false;
            errorDisplay.innerText = errorMsg;
        },
    },
    preview: {
        drop_handler: function (event) {
            event.preventDefault();
            dropzoneFunctions.validateAndSelectDroppedItem(event, this);
        },
        selectFile: function (selectedFile, that){
            this.onmouseleave_handler();
            dropzoneFunctions.validateAndPreviewFile(selectedFile, that)
        },
        ondragenter_handler: function () {
            this.showDropzoneInstructions();
        },
        ondragleave_handler: function () {
            this.hideDropzoneInstructions();
        },
        onmouseenter_handler: function () {
            this.showDropzoneInstructions();
        },
        onmouseleave_handler: function () {
            this.hideDropzoneInstructions();
        },
        showDropzoneInstructions: function() {
            document.getElementById('asset-preview-dropzone-instructions').setAttribute('class', 'flex-container--column flex-container--center-center front');
            document.getElementById('asset-preview').setAttribute('class', 'back');
        },
        hideDropzoneInstructions: function() {
            document.getElementById('asset-preview-dropzone-instructions').setAttribute('class', 'hidden');
            document.getElementById('asset-preview').setAttribute('class', '');
        },
        showError: function(errorMsg){
            const errorDisplay = document.getElementById('asset-preview-dropzone-error');
            errorDisplay.hidden = false;
            errorDisplay.innerText = errorMsg;
        },
        hideError: function(){
            const errorDisplay = document.getElementById('asset-preview-dropzone-error');
            errorDisplay.hidden = true;
        },
    }
}

