function preview_onmouseenter_handler () {
    document.getElementById('asset-preview-dropzone-instructions').setAttribute('class', 'flex-container--column flex-container--center-center position-absolute');
    document.getElementById('asset-preview').style.opacity = 0.2;
}

function preview_onmouseleave_handler () {
    document.getElementById('asset-preview-dropzone-instructions').setAttribute('class', 'hidden');
    document.getElementById('asset-preview').style.opacity = 1;
}

