import React from 'react';

class Dropzone extends React.Component {
  render () {
    return (
      <div id="primary-dropzone" class="dropzone row row--margined row--padded row--tall flex-container--column flex-container--center-center" ondrop="drop_handler(event);" ondragover="dragover_handler(event);" ondragend="dragend_handler(event)" ondragenter="dragenter_handler(event)" ondragleave="dragexit_handler(event)" onclick="publishFileFunctions.triggerFileChooser('file_input', event)">
        <div id="primary-dropzone-instructions">
          <p class="info-message-placeholder info-message--failure" id="input-error-file-selection" hidden="true"></p>
          <p>Drag & drop image or video here to publish</p>
          <p class="fine-print">OR</p>
          <p class="blue--underlined">CHOOSE FILE</p>
        </div>
        <div id="dropbzone-dragover" class="hidden">
          <p class="blue">Drop it.</p>
        </div>
      </div>
    );
  }
};

module.exports = Dropzone;
