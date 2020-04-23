import React from 'react';

class PublishDisabledMessage extends React.Component {
  render () {
    const message = this.props.message;
    return (
      <div className={'publish-disabled-message'}>
        <div className={'message'}>
          <p className={'text--secondary'}>Publishing is currently disabled.</p>
          <p className={'text--secondary'}>
            Try <a className='link--primary' href='https://lbry.tv' target='_blank'>lbry.tv</a>
          </p>
          <p className={'text--secondary'}>{message}</p>
        </div>
      </div>
    );
  }
}

export default PublishDisabledMessage;
