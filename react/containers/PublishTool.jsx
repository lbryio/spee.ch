import React from 'react';
import PreviewDropzone from './Dropzone.jsx';
import PublishForm from './PublishForm.jsx';
import PublishStatus from '../components/PublishStatus.jsx';
import {connect} from 'react-redux';

class PublishTool extends React.Component {
  render () {
    if (this.props.file) {
      if (this.props.status) {
        return (
          <PublishStatus
            status={this.props.status}
            message={this.props.message}
          />
        );
      } else {
        return <PublishForm />;
      }
    } else {
      return <PreviewDropzone />;
    }
  }
};

const mapStateToProps = state => {
  return {
    file   : state.file,
    status : state.status.status,
    message: state.status.message,
  };
};

export default connect(mapStateToProps, null)(PublishTool);
