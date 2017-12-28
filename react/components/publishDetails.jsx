import React from 'react';

class Title extends React.Component {
  render () {
    return (
      <input type="text" id="publish-title" class="input-text text--large input-text--full-width" placeholder="Give your post a title..." />
    )
  }
}

class Preview extends React.Component {
  render () {
    return (
      <div id="asset-preview-holder" class="dropzone" ondrop="drop_handler(event);" ondragover="dragover_handler(event);" ondragend="dragend_handler(event)"  ondragenter="preview_onmouseenter_handler()" ondragleave="preview_onmouseleave_handler()" onmouseenter="preview_onmouseenter_handler()" onmouseleave="preview_onmouseleave_handler()" onclick="publishFileFunctions.triggerFileChooser('file_input', event)">
        <div id="asset-preview-dropzone-instructions" class="hidden">
          <p>Drag & drop image or video here</p>
          <p class="fine-print">OR</p>
          <p class="blue--underlined">CHOOSE FILE</p>
        </div>
        <div id="asset-preview-target"></div>
      </div>
    )
  }
};

class Details extends React.Component {
  render () {
    return (
      {{> publishForm-Channel}}
      {{> publishForm-Url}}
      {{> publishForm-Thumbnail}}
      {{> publishForm-Details}}
      {{> publishForm-Submit}}
    )
  }
}

class PublishDetails extends React.Component {
  render () {
    return (
      <div id="publish-form" class="hidden">
        <div class="row row--padded row--no-bottom">
          <div class="column column--10">
            <Title />
          </div>
          <div class="column column--5 column--sml-10" >
            <div class="row row--padded">
              <Preview />
            </div>
          </div>
          <div class="column column--5 column--sml-10 align-content-top">
            <div id="publish-active-area" class="row row--padded">
              <Details />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = PublishDetails;
