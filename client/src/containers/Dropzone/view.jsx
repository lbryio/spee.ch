import React from 'react';
import { validateFile } from '../../utils/file';
import DropzonePreview from '@components/DropzonePreview';
import DropzoneDropItDisplay from '@components/DropzoneDropItDisplay';
import DropzoneInstructionsDisplay from '@components/DropzoneInstructionsDisplay';

class Dropzone extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dragOver  : false,
      mouseOver : false,
      dimPreview: false,
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFileInput = this.handleFileInput.bind(this);
    this.chooseFile = this.chooseFile.bind(this);
  }
  handleDrop (event) {
    event.preventDefault();
    this.setState({dragOver: false});
    // if dropped items aren't files, reject them
    const dt = event.dataTransfer;
    if (dt.items) {
      if (dt.items[0].kind === 'file') {
        const droppedFile = dt.items[0].getAsFile();
        this.chooseFile(droppedFile);
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
    this.setState({dragOver: true, dimPreview: true});
  }
  handleDragLeave () {
    this.setState({dragOver: false, dimPreview: false});
  }
  handleMouseEnter () {
    this.setState({mouseOver: true, dimPreview: true});
  }
  handleMouseLeave () {
    this.setState({mouseOver: false, dimPreview: false});
  }
  handleClick (event) {
    event.preventDefault();
    document.getElementById('file_input').click();
  }
  handleFileInput (event) {
    event.preventDefault();
    const fileList = event.target.files;
    this.chooseFile(fileList[0]);
  }
  chooseFile (file) {
    if (file) {
      try {
        validateFile(file); // validate the file's name, type, and size
      } catch (error) {
        return this.props.setFileError(error.message);
      }
      // stage it so it will be ready when the publish button is clicked
      this.props.selectFile(file);
    }
  }
  render () {
    return (
      <div className='dropzone-wrapper'>
        <form>
          <input
            className='input-file'
            type='file'
            id='file_input'
            name='file_input'
            accept='video/*,image/*'
            onChange={this.handleFileInput}
            encType='multipart/form-data'
          />
        </form>
        <div
          className={'dropzone' + (this.state.dragOver ? ' dropzone--drag-over' : '')}
          onDrop={this.handleDrop}
          onDragOver={this.handleDragOver}
          onDragEnd={this.handleDragEnd}
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}>
          {this.props.file ? (
            <div>
              <DropzonePreview
                dimPreview={this.state.dimPreview}
                file={this.props.file}
                thumbnail={this.props.thumbnail}
              />
              { this.state.dragOver ? <DropzoneDropItDisplay /> : null }
              { this.state.mouseOver ? (
                <DropzoneInstructionsDisplay
                  fileError={this.props.fileError}
                />
              ) : null }
            </div>
          ) : (
            this.state.dragOver ? <DropzoneDropItDisplay /> : (
              <DropzoneInstructionsDisplay
                fileError={this.props.fileError}
              />
            )
          )}
        </div>
      </div>
    );
  }
};

export default Dropzone;
