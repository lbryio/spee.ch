import React from 'react';
import Dropzone from 'containers/Dropzone';
import PublishDetails from 'containers/PublishDetails';
import PublishStatus from 'containers/PublishStatus';

class PublishTool extends React.Component {
  render () {
    if (this.props.disabled) {
      return (
        <div className='row row--tall flex-container--column flex-container--center-center'>
          <p>Publishing is temporarily disabled.</p>
          <p>Please check back soon or join our <a className='link--primary' href='https://discord.gg/YjYbwhS'>discord channel</a> for updates.</p>
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
