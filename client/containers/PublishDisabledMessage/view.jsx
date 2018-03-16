import React from 'react';

class PublishDisabledMessage extends React.Component {
  render () {
    const message = this.props.message;
    console.log('this.props.message:', message);
    return (
      <div className='row dropzone--disabled row--tall flex-container--column flex-container--center-center'>
        <p className='text--disabled'>Publishing is currently disabled.</p>
        <p className='text--disabled'>{message}</p>
      </div>
    );
  }
}

export default PublishDisabledMessage;
