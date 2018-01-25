import React from 'react';
import Dropzone from 'containers/Dropzone';
import PublishForm from 'containers/PublishForm';
import PublishStatus from 'components/PublishStatus';

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
