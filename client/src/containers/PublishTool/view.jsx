import React from 'react';
import { withRouter, Prompt } from 'react-router';
import Dropzone from '@containers/Dropzone';
import PublishPreview from '@components/PublishPreview';
import PublishStatus from '@containers/PublishStatus';
import PublishDisabledMessage from '@containers/PublishDisabledMessage';
import { SAVE } from '../../constants/confirmation_messages';

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
          return (
            <React.Fragment>
              <Prompt
                message={SAVE}
              />
              <PublishPreview isUpdate={isUpdate} />
            </React.Fragment>
          );
        }
      }
      return <Dropzone />;
    }
  }
};

export default withRouter(PublishTool);
