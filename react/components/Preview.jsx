import React from 'react';

class Preview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      previewSource: '',
    }
    this.previewFile = this.previewFile.bind(this);
  }
  componentWillMount () {
    console.log('Preview will mount');
    this.previewFile(this.props.file);
  }
  componentWillReceiveProps (newProps) {
    this.previewFile(newProps.file);
  }
  previewFile (file) {
    const that = this;
    if (file.type !== 'video/mp4') {
      const previewReader = new FileReader();
      previewReader.readAsDataURL(file);
      previewReader.onloadend = function () {
        that.setState({previewSource: previewReader.result});
      };
    } else {
      that.setState({previewSource: (this.props.thumbnail || '/assets/img/video_thumb_default.png')});
    }
  }
  render () {
    return (
      <img
        id="asset-preview"
        src={this.state.previewSource}
        className={this.props.dimPreview ? 'dim' : ''}
        alt="publish preview"
      />
    );
  }
};

export default Preview;
