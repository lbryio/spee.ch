import React from 'react';
import PropTypes from 'prop-types';

class PublishPreview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      imgSource       : '',
      defaultThumbnail: '/assets/img/video_thumb_default.png',
    };
  }
  componentDidMount () {
    this.setPreviewImageSource(this.props.file);
  }
  componentWillReceiveProps (newProps) {
    if (newProps.file !== this.props.file) {
      this.setPreviewImageSource(newProps.file);
    }
    if (newProps.thumbnail !== this.props.thumbnail) {
      if (newProps.thumbnail) {
        this.setPreviewImageSourceFromFile(newProps.thumbnail);
      } else {
        this.setState({imgSource: this.state.defaultThumbnail});
      }
    }
  }
  setPreviewImageSourceFromFile (file) {
    const previewReader = new FileReader();
    previewReader.readAsDataURL(file);
    previewReader.onloadend = () => {
      this.setState({imgSource: previewReader.result});
    };
  }
  setPreviewImageSource (file) {
    if (file.type !== 'video/mp4') {
      this.setPreviewImageSourceFromFile(file);
    } else {
      if (this.props.thumbnail) {
        this.setPreviewImageSourceFromFile(this.props.thumbnail);
      }
      this.setState({imgSource: this.state.defaultThumbnail});
    }
  }
  render () {
    return (
      <img
        id='dropzone-preview'
        src={this.state.imgSource}
        className={this.props.dimPreview ? 'dim' : ''}
        alt='publish preview'
      />
    );
  }
};

PublishPreview.propTypes = {
  dimPreview: PropTypes.bool.isRequired,
  file      : PropTypes.object.isRequired,
  thumbnail : PropTypes.object,
};

export default PublishPreview;
