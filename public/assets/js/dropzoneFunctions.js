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
    primary: {
        drop_handler: function (event) {
            event.preventDefault();
            this.dragexit_handler();
            var dt = event.dataTransfer;
            if (dt.items) {
                if (dt.items[0].kind == 'file') {
                    var droppedFile = dt.items[0].getAsFile();
                    this.selectFile(droppedFile);
                }
            }
        },
        selectFile(selectedFile){
            try {
                validationFunctions.validateFile(selectedFile); // validate the file's name, type, and size
            } catch (error) {
                this.showError(error.message);
                return;
            }
            publishFileFunctions.previewAndStageFile(selectedFile);
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
            var dt = event.dataTransfer;
            if (dt.items) {
                if (dt.items[0].kind == 'file') {
                    var droppedFile = dt.items[0].getAsFile();
                    this.selectFile(droppedFile);
                }
            }
        },
        selectFile(selectedFile){
            try {
                validationFunctions.validateFile(selectedFile); // validate the file's name, type, and size
            } catch (error) {
                this.showError(error.message);
                return;
            }
            publishFileFunctions.previewAndStageFile(selectedFile);
        },
        onmouseenter_handler: function () {
            // show drag-and-drop instructions
            document.getElementById('asset-preview-dropzone-instructions').setAttribute('class', 'flex-container--column flex-container--center-center position-absolute');
            // make image lighter
            document.getElementById('asset-preview').style.opacity = 0.2;
        },
        onmouseleave_handler: function () {
            // hide instructions
            document.getElementById('asset-preview-dropzone-instructions').setAttribute('class', 'hidden');
            // make image regular visibility
            document.getElementById('asset-preview').style.opacity = 1;
        },
        showError: function(errorMsg){
            // show error
            const errorElement = document.getElementById('asset-preview-dropzone-error');
            errorElement.setAttribute('class', 'flex-container--column flex-container--center-center position-absolute');
            errorElement.innerText = errorMsg;
            // make image lighter
            document.getElementById('asset-preview').style.opacity = 0.2;
            // set timer to hide error
            setTimeout(this.hideError, 2000);
        },
        hideError: function(){
            // hide error
            const errorElement = document.getElementById('asset-preview-dropzone-error');
            errorElement.innterText = '';
            errorElement.setAttribute('class', 'hidden');
            // make image regular visibility
            document.getElementById('asset-preview').style.opacity = 1;
        }
    }
}

