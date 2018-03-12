import React from 'react';
import Dropzone from 'containers/Dropzone';
import PublishDetails from 'containers/PublishDetails';
import PublishStatus from 'containers/PublishStatus';

class PublishTool extends React.Component {
  render () {
    if (this.props.disabled) {
      return (
        <div className='row dropzone--disabled row--tall flex-container--column flex-container--center-center'>
          <p className='text--disabled'>Publishing is temporarily disabled.</p>
          <p className='text--disabled'>Please check back soon or join our <a className='link--disabled-text' href='https://discord.gg/YjYbwhS'>discord channel</a> for updates.</p>
        </div>
      );
    }
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
};

export default PublishTool;
