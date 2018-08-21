import React from 'react';
import Dropzone from '@containers/Dropzone';
import PublishPreview from '@components/PublishPreview';
import PublishStatus from '@containers/PublishStatus';
import PublishDisabledMessage from '@containers/PublishDisabledMessage';

class PublishTool extends React.Component {
  render () {
    const {disabled, file, isUpdate, status} = this.props;
    if (disabled) {
      return (
        <PublishDisabledMessage />
      );
    } else {
      if (file || isUpdate) {
        if (status) {
          return (
            <PublishStatus />
          );
        } else {
          return <PublishPreview isUpdate={isUpdate} />;
        }
      }
      return <Dropzone />;
    }
  }
};

export default PublishTool;
