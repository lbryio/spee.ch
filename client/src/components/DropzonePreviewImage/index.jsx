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
    const { isUpdate, sourceUrl, file } = this.props;
    if (isUpdate && sourceUrl) {
      this.setState({ imgSource: sourceUrl });
    } else {
      this.setPreviewImageSource(file);
    }
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
        src={this.state.imgSource}
        className={'dropzone-preview-image ' + (this.props.dimPreview ? 'publish-preview-dim' : '')}
        alt='publish preview'
      />
    );
  }
};

PublishPreview.propTypes = {
  dimPreview: PropTypes.bool.isRequired,
  file      : PropTypes.object,
  thumbnail : PropTypes.object,
  isUpdate  : PropTypes.bool,
  sourceUrl : PropTypes.string,
};

export default PublishPreview;
