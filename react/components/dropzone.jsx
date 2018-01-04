import React from 'react';

class Dropzone extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fileError: null,
    }
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFileInput = this.handleFileInput.bind(this);
  }
  validateFile (file) {
    if (!file) {
      console.log('no file found');
      throw new Error('no file provided');
    }
    if (/'/.test(file.name)) {
      console.log('file name had apostrophe in it');
      throw new Error('apostrophes are not allowed in the file name');
    }
    // validate size and type
    switch (file.type) {
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
        if (file.size > 10000000) {
          console.log('file was too big');
          throw new Error('Sorry, images are limited to 10 megabytes.');
        }
        break;
      case 'image/gif':
        if (file.size > 50000000) {
          console.log('file was too big');
          throw new Error('Sorry, .gifs are limited to 50 megabytes.');
        }
        break;
      case 'video/mp4':
        if (file.size > 50000000) {
          console.log('file was too big');
          throw new Error('Sorry, videos are limited to 50 megabytes.');
        }
        break;
      default:
        console.log('file type is not supported');
        throw new Error(file.type + ' is not a supported file type. Only, .jpeg, .png, .gif, and .mp4 files are currently supported.');
    }
  }
  handleDrop (event) {
    console.log('handleDrop', event);
    event.preventDefault();
    // if dropped items aren't files, reject them
    const dt = event.dataTransfer;
    console.log('dt', dt);
    if (dt.items) {
      if (dt.items[0].kind == 'file') {
        const droppedFile = dt.items[0].getAsFile();
        console.log('droppedFile', droppedFile);
        // When a file is selected for publish, validate that file and
        try {
          this.validateFile(droppedFile); // validate the file's name, type, and size
        } catch (error) {
          return this.setState('fileError', error.message);
        }
        // stage it so it will be ready when the publish button is clicked
        this.props.stageFileAndShowDetails(droppedFile);
      }
    }
  }
  handleDragOver (event) {
    event.preventDefault();
  }
  handleDragEnd (event) {
    var dt = event.dataTransfer;
    if (dt.items) {
      for (var i = 0; i < dt.items.length; i++) {
        dt.items.remove(i);
      }
    } else {
      event.dataTransfer.clearData();
    }
  }
  handleDragEnter () {
    const thisDropzone = document.getElementById('primary-dropzone');
    thisDropzone.setAttribute('class', 'dropzone dropzone--drag-over row row--padded row--tall flex-container--column flex-container--center-center');
    thisDropzone.firstElementChild.setAttribute('class', 'hidden');
    thisDropzone.lastElementChild.setAttribute('class', '');
  }
  handleDragLeave () {
    const thisDropzone = document.getElementById('primary-dropzone');
    thisDropzone.setAttribute('class', 'dropzone row row--tall row--padded flex-container--column flex-container--center-center');
    thisDropzone.firstElementChild.setAttribute('class', '');
    thisDropzone.lastElementChild.setAttribute('class', 'hidden');
  }
  handleClick (event) {
    event.preventDefault();
    // trigger file input
    document.getElementById('file_input').click();
  }
  handleFileInput (event) {
    event.preventDefault();
    const fileList = event.target.files;
    const chosenFile = fileList[0];
    if (chosenFile) {
      try {
        this.validateFile(chosenFile); // validate the file's name, type, and size
      } catch (error) {
        return this.setState('fileError', error.message);
      }
      // stage it so it will be ready when the publish button is clicked
      this.props.stageFileAndShowDetails(chosenFile);
    }
  }
  render () {
    return (
      <div className="row row--tall">
        <form>
          <input className="input-file" type="file" id="file_input" name="file_input" accept="video/*,image/*" onChange={this.handleFileInput} encType="multipart/form-data"/>
        </form>
        <div id="primary-dropzone" className="dropzone row row--padded row--tall flex-container--column flex-container--center-center" onDrop={this.handleDrop} onDragOver={this.handleDragOver} onDragEnd={this.handleDragEnd} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onClick={this.handleClick}>
          <div id="primary-dropzone-instructions">
            <p className="info-message-placeholder info-message--failure" id="input-error-file-selection" hidden="true">{this.state.fileError}</p>
            <p>Drag & drop image or video here to publish</p>
            <p className="fine-print">OR</p>
            <p className="blue--underlined">CHOOSE FILE</p>
          </div>
          <div id="dropbzone-dragover" className="hidden">
            <p className="blue">Drop it.</p>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = Dropzone;
