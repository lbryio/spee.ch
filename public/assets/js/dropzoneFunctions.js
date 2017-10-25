function showInstructions () {
    document.getElementById('preview-dropzone-instructions').setAttribute('class', 'flex-container flex-container--column flex-container--center position-absolute');
    document.getElementById('asset-preview').style.opacity = 0.3;
}

function hideInstructions () {
    document.getElementById('preview-dropzone-instructions').setAttribute('class', 'hidden');
    document.getElementById('asset-preview').style.opacity = 1;
}

function triggerFileChooser(fileInputId, event) {
    document.getElementById(fileInputId).click();
}

function drop_handler(event) {
    event.preventDefault();
    // if dropped items aren't files, reject them
    var dt = event.dataTransfer;
    if (dt.items) {
        if (dt.items[0].kind == 'file') {
            var droppedFile = dt.items[0].getAsFile();
            previewAndStageFile(droppedFile);
        }
    }
}

function dragover_handler(event) {
    event.preventDefault();
}

function dragend_handler(event) {
    var dt = event.dataTransfer;
    if (dt.items) {
        for (var i = 0; i < dt.items.length; i++) {
            dt.items.remove(i);
        }
    } else {
        event.dataTransfer.clearData();
    }
}

function dragenter_handler(event) {
    const dropzone = document.getElementById(event.target.id);
    dropzone.setAttribute('class', 'dropzone dropzone--drag-over row row--margined row--padded row--tall flex-container flex-container--column flex-container--center');
    dropzone.firstElementChild.setAttribute('class', 'hidden');
    dropzone.lastElementChild.setAttribute('class', '');

}

function dragexit_handler(event) {
    const dropzone = document.getElementById(event.target.id);
    dropzone.setAttribute('class', 'dropzone row row--tall row--margined row--padded flex-container flex-container--column flex-container--center');
    dropzone.firstElementChild.setAttribute('class', '');
    dropzone.lastElementChild.setAttribute('class', 'hidden');
}