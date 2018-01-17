import React from 'react';
import Dropzone from '../Dropzone';
import PublishForm from '../PublishForm';
import PublishStatus from '../../components/PublishStatus.jsx';

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
      return <Dropzone />;
    }
  }
};

export default PublishTool;
