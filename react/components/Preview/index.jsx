import React from 'react';
import PropTypes from 'prop-types';

class Preview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      imgSource       : '',
      defaultThumbnail: '/assets/img/video_thumb_default.png',
    };
  }
  componentDidMount () {
    this.previewFile(this.props.file);
  }
  componentWillReceiveProps (newProps) {
    if (newProps.file !== this.props.file) {
      this.previewFile(newProps.file);
    }
    if (newProps.thumbnail !== this.props.thumbnail) {
      this.setState({imgSource: (newProps.thumbnail || this.state.defaultThumbnail)});
    }
  }
  previewFile (file) {
    if (file.type !== 'video/mp4') {
      const previewReader = new FileReader();
      previewReader.readAsDataURL(file);
      previewReader.onloadend = () => {
        this.setState({imgSource: previewReader.result});
      };
    } else {
      this.setState({imgSource: (this.props.thumbnail || this.state.defaultThumbnail)});
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

Preview.propTypes = {
  dimPreview: PropTypes.bool.isRequired,
  file      : PropTypes.object.isRequired,
  thumbnail : PropTypes.string,
};

export default Preview;
