import React from 'react';
import {connect} from 'react-redux';

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
    if (this.props.file) {
      this.previewFile(this.props.file);
    }
  }
  componentWillReceiveProps ({ file }) {
    console.log('Preview will receive props');
    this.previewFile(file);
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
    } else {
      that.setState({previewSource: '/assets/img/video_thumb_default.png'});
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

const mapStateToProps = state => {
  return {
    file: state.file,
  };
};

export default connect(mapStateToProps, null)(Preview);
