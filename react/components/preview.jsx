import React from 'react';

class Preview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      previewSource: '',
    }
    this.previewFile = this.previewFile.bind(this);
  }
  componentDidMount () {
    console.log('props after mount', this.props);
    this.previewFile(this.props.file);
  }
  previewFile (file) {
    console.log('previewFile', file)
    const that = this;
    if (file.type !== 'video/mp4') {
      const previewReader = new FileReader();
      previewReader.readAsDataURL(file);
      previewReader.onloadend = function () {
        that.setState({previewSource: previewReader.result});
      };
      // clear & hide the thumbnail selection input
      this.props.hideThumbnailTool();
    } else {
      that.setState({previewSource: '/assets/img/video_thumb_default.png'});
      // clear & show the thumbnail selection input
      this.props.showThumbnailTool();
    }
  }
  render () {
    return (
      <div id="asset-preview-holder" className="dropzone">
        <div id="asset-preview-dropzone-instructions" className="hidden">
          <p>Drag & drop image or video here</p>
          <p className="fine-print">OR</p>
          <p className="blue--underlined">CHOOSE FILE</p>
        </div>
        <img id="asset-preview" src={this.state.previewSource} alt="publish preview"/>
      </div>
    );
  }
};

module.exports = Preview;
