import React from 'react';
import PropTypes from 'prop-types';

class Preview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      imgSource       : '',
      defaultThumbnail: '/assets/img/video_thumb_default.png',
    };
    this.previewFile = this.previewFile.bind(this);
  }
  componentWillMount () {
    console.log('Preview will mount');
    this.previewFile(this.props.file);
  }
  componentWillReceiveProps (newProps) {
    console.log('Preview will receive props', newProps);
    if (newProps.file !== this.props.file) {
      this.previewFile(newProps.file);
    }
    if (newProps.thumbnail !== this.props.thumbnail) {
      console.log('updating thumbnail', this.props.thumbnail);
      this.setState({imgSource: (newProps.thumbnail || this.state.defaultThumbnail)});
    }
  }
  previewFile (file) {
    const that = this;
    if (file.type !== 'video/mp4') {
      const previewReader = new FileReader();
      previewReader.readAsDataURL(file);
      previewReader.onloadend = function () {
        that.setState({imgSource: previewReader.result});
      };
    } else {
      that.setState({imgSource: (this.props.thumbnail || this.state.defaultThumbnail)});
    }
  }
  render () {
    return (
      <img
        id="asset-preview"
        src={this.state.imgSource}
        className={this.props.dimPreview ? 'dim' : ''}
        alt="publish preview"
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
