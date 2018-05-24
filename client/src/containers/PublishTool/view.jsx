import React from 'react';
import Dropzone from '@containers/Dropzone';
import PublishDetails from '@containers/PublishDetails';
import PublishStatus from '@containers/PublishStatus';
import PublishDisabledMessage from '@containers/PublishDisabledMessage';

class PublishTool extends React.Component {
  render () {
    if (this.props.disabled) {
      return (
        <PublishDisabledMessage />
      );
    } else {
      if (this.props.file) {
        if (this.props.status) {
          return (
            <PublishStatus />
          );
        } else {
          return <PublishDetails />;
        }
      }
      return <Dropzone />;
    }
  }
};

export default PublishTool;
