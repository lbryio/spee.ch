import React from 'react';
import PropTypes from 'prop-types';
import ThreeScene from '@components/ThreeScene';

class PublishPreview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      imgSource       : '',
      defaultThumbnail: '/assets/img/video_thumb_default.png',
    };
  }
  componentDidMount () {
    this.setPreviewSource(this.props.file);
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
  setPreviewImageVideoSourceFromFile (file) {
    const previewReader = new FileReader();
    previewReader.readAsDataURL(file);
    previewReader.onloadend = () => {
      this.setState({imgSource: previewReader.result});
    };
  }
  setPreviewImageVideoSource (file) {
    if (file.type !== 'video/mp4') {
      this.setPreviewImageVideoSourceFromFile(file);
    } else {
      if (this.props.thumbnail) {
        this.setPreviewImageVideoSourceFromFile(this.props.thumbnail);
      }
      this.setState({imgSource: this.state.defaultThumbnail});
    }
  }
  setPreviewSource (file) {
    if (!file.isStl) {
      this.setPreviewImageVideoSource(file);
    }
  }
  renderImageVideo () {
    return (
      <img
        src={this.state.imgSource}
        className={'dropzone-preview-image ' + (this.props.dimPreview ? 'publish-preview-dim' : '')}
        alt='publish preview'
      />
    );
  }
  renderSTL () {
    return (
      <ThreeScene file={this.props.file} />
    );
  }
  render () {
    if (this.props.file.isStl) {
      return this.renderSTL();
    }

    return this.renderImageVideo();
  }
};

PublishPreview.propTypes = {
  dimPreview: PropTypes.bool.isRequired,
  file      : PropTypes.object.isRequired,
  thumbnail : PropTypes.object,
};

export default PublishPreview;
