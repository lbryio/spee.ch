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
  componentWillReceiveProps (newProps) {
    console.log('Preview will receive props', newProps);
    this.previewFile(newProps.file);
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

const mapStateToProps = state => {
  return {
    file     : state.file,
    thumbnail: state.metadata.thumbnail,
  };
};

export default connect(mapStateToProps, null)(Preview);