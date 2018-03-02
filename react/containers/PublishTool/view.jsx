import React from 'react';
import Dropzone from 'containers/Dropzone';
import PublishDetails from 'containers/PublishDetails';
import PublishStatus from 'containers/PublishStatus';

class PublishTool extends React.Component {
  render () {
    if (this.props.file) {
      if (this.props.status) {
        return (
          <PublishStatus />
        );
      } else {
        return <PublishDetails />;
      }
    } else {
      return <Dropzone />;
    }
  }
};

export default PublishTool;
