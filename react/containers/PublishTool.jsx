import React from 'react';
import PreviewDropzone from './Dropzone.jsx';
import PublishForm from './PublishForm.jsx';
import PublishStatus from '../components/PublishStatus.jsx';
import {connect} from 'react-redux';

class PublishTool extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="row row--tall flex-container--column">
        { !this.props.file && <PreviewDropzone /> }
        { this.props.file && <PublishForm /> }
        { this.props.publishStatus && <PublishStatus /> }
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    file         : state.file,
    publishStatus: state.publishStatus,
  };
};

export default connect(mapStateToProps, null)(PublishTool);
