import React from 'react';

class PublishDisabledMessage extends React.Component {
  render () {
    const message = this.props.message;
    return (
      <div className='row dropzone--disabled row--tall flex-container--column flex-container--center-center'>
        <p className='text--secondary'>Publishing is currently disabled.</p>
        <p className='text--secondary'>{message}</p>
      </div>
    );
  }
}

export default PublishDisabledMessage;
