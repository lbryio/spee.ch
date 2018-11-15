import React from 'react';

import { validateFile } from '../../utils/file';
import Creatify from '@components/Creatify';
import DropzonePreviewImage from '@components/DropzonePreviewImage';
import DropzoneDropItDisplay from '@components/DropzoneDropItDisplay';
import DropzoneInstructionsDisplay from '@components/DropzoneInstructionsDisplay';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class Dropzone extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      dragOver   : false,
      mouseOver  : false,
      dimPreview : false,
      filePreview: null,
      memeify    : false,
    };

    if(props.file) {
      // No side effects allowed with `getDerivedStateFromProps`, so
      // we must use `componentDidUpdate` and `constructor` routines.
      // Note: `FileReader` has an `onloadend` side-effect
      this.updateFilePreview();
    }

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

  componentDidUpdate(prevProps) {
    if(prevProps.file !== this.props.file) {
      this.updateFilePreview();
    }
  }

  updateFilePreview() {
    if (this.props.file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.props.file);
      fileReader.onloadend = () => {
        this.setState({
          filePreview: fileReader.result
        });
      };
    }
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

  selectFileFromCanvas (canvas) {
    const destinationFormat = 'image/jpeg';

    canvas.toBlob((blob) => {
      const file = new File([blob], 'memeify.jpg', {
        type: destinationFormat,
      });

      this.props.selectFile(file);

      // TODO: Add ability to reset.
      this.setState({
        memeify: false,
      });
    }, destinationFormat, 0.95);
  }

  render () {
    const { dragOver, mouseOver, dimPreview, filePreview, memeify } = this.state;
    const { file, thumbnail, fileError, isUpdate, sourceUrl, fileExt } = this.props;

    const hasContent = !!(file || isUpdate);

    const dropZoneHooks = file ? {} : {
      onDrop: this.handleDrop,
      onDragOver: this.handleDragOver,
      onDragEnd: this.handleDragEnd,
      onDragEnter: this.handleDragEnter,
      onDragLeave: this.handleDragLeave,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onClick: this.handleClick,
    };

    const dropZonePreviewProps = file ? {
      dimPreview,
      file,
      thumbnail,
    } : {
      dimPreview: true,
      isUpdate: true,
      sourceUrl,
    };

    const memeifyContent = memeify && file && filePreview ? (
      <Creatify flex toolbarClassName={'dropzone-memeify-toolbar'} onSave={(canvas) => this.selectFileFromCanvas(canvas)}>
        <div style={{ background: '#fff', flex: 1 }}>
          <img style={{ width: '100%' }} src={filePreview} />
        </div>
      </Creatify>
    ) : null;

    const dropZoneClassName = 'dropzone' + (dragOver ? ' dropzone--drag-over' : '');

    return (
      <React.Fragment>
        {isUpdate && fileExt === 'mp4' ? (
          <p>Video updates are currently disabled. This feature will be available soon. You can edit metadata.</p>
        ) : (
          <div className={'dropzone-wrapper'}>
            { hasContent && !memeify && (
              <div className={'dropzone-memeify-button'} onClick={() => this.setState({ memeify: !memeify })}>
                <FontAwesomeIcon icon={faEdit} /> Memeify
              </div>
            )}
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
            <div className={dropZoneClassName} {...dropZoneHooks}>
              {hasContent ? (
                <div className={'dropzone-preview-wrapper' + (memeifyContent ? ' dropzone-preview-memeify' : '')}>
                  <DropzonePreviewImage {...dropZonePreviewProps} />
                  <div className={'dropzone-preview-overlay'}>
                    { dragOver ? <DropzoneDropItDisplay /> : null }
                    { mouseOver ? (
                      <DropzoneInstructionsDisplay
                        fileError={fileError}
                        message={fileExt === 'mp4' ? 'Drag & drop new thumbnail' : null}
                      />
                    ) : null }
                    {memeifyContent}
                  </div>
                </div>
              ) : (
                dragOver ? <DropzoneDropItDisplay /> : (
                  <DropzoneInstructionsDisplay fileError={fileError} />
                )
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
};

export default Dropzone;
