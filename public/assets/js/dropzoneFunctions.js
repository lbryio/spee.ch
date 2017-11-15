const dropzoneFunctions = {
    drop_handler: function (event) {
        event.preventDefault();
        var dt = event.dataTransfer;
        if (dt.items) {
            if (dt.items[0].kind == 'file') {
                var droppedFile = dt.items[0].getAsFile();
                publishFileFunctions.previewAndStageFile(droppedFile);
            }
        }
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
            this.dragexit_handler();
            dropzoneFunctions.drop_handler(event);
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
    },
    preview: {
        drop_handler: function (event) {
            dropzoneFunctions.drop_handler(event);
        },
        onmouseenter_handler: function () {
            document.getElementById('asset-preview-dropzone-instructions').setAttribute('class', 'flex-container--column flex-container--center-center position-absolute');
            document.getElementById('asset-preview').style.opacity = 0.2;
        },
        onmouseleave_handler: function () {
            document.getElementById('asset-preview-dropzone-instructions').setAttribute('class', 'hidden');
            document.getElementById('asset-preview').style.opacity = 1;
        }
    }
}

