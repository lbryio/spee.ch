import React from 'react';
import ProgressBar from '@components/ProgressBar';
import * as publishStates from '../../constants/publish_claim_states';
import ButtonSecondary from '@components/ButtonSecondary';

class PublishStatus extends React.Component {
  render () {
    const { status, message, clearFile } = this.props;
    return (
      <div className={'publish-status'}>
        {status === publishStates.LOAD_START &&
        <div>
          <p>File is loading to server</p>
          <p className={'text--secondary'}>0%</p>
        </div>
        }
        {status === publishStates.LOADING &&
        <div>
          <p>File is loading to server</p>
          <p className={'text--secondary'}>{message}</p>
        </div>
        }
        {status === publishStates.PUBLISHING &&
        <div>
          <p>Upload complete.  Your file is now being published on the blockchain...</p>
          <ProgressBar size={12} />
          <p>Curious what magic is happening here? <a className='link--primary' target='blank' href='https://lbry.io/faq/what-is-lbry'>Learn more.</a></p>
        </div>
        }
        {status === publishStates.SUCCESS &&
        <div>
          <p>Your publish is complete! You are being redirected to it now.</p>
          <p>If you are not automatically redirected, <a className='link--primary' target='_blank' href={message}>click here.</a></p>
        </div>
        }
        {status === publishStates.FAILED &&
        <div>
          <p>Something went wrong...</p>
          <p className={'text--strong'}>{message}</p>
          <p>For help, post the above error text in the #speech channel on the <a className='link--primary' href='https://chat.lbry.io' target='_blank'>lbry discord</a></p>
          <ButtonSecondary
            value={'Reset'}
            onClickHandler={clearFile}
          />
        </div>
        }
      </div>
    );
  }
};

export default PublishStatus;
