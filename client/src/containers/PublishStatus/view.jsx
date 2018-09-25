import React from 'react';
import ProgressBar from '@components/ProgressBar';
import * as publishStates from '../../constants/publish_claim_states';
import ButtonSecondary from '@components/ButtonSecondary';
import Row from '@components/Row';

class PublishStatus extends React.Component {
  render () {
    const { status, message, clearFile } = this.props;
    return (
      <div className={'publish-status'}>
        {status === publishStates.LOAD_START &&
          <div className={'status'}>
            <Row>
              <p>le is loading to server</p>
            </Row>
            <Row>
              <p className={'text--secondary'}>0%</p>
            </Row>
          </div>
        }
        {status === publishStates.LOADING &&
          <div className={'status'}>
            <Row>
              <p>File is loading to server</p>
            </Row>
            <Row>
              <p className={'text--secondary'}>{message}</p>
            </Row>
          </div>
        }
        {status === publishStates.PUBLISHING &&
          <div className={'status'}>
            <Row>
              <p>Upload complete.  Your file is now being published on the blockchain...</p>
            </Row>
            <Row>
              <ProgressBar size={12} />
            </Row>
            <Row>
              <p>Curious what magic is happening here? <a className='link--primary' target='blank' href='https://lbry.io/faq/what-is-lbry'>Learn more.</a></p>
            </Row>
          </div>
        }
        {status === publishStates.SUCCEEDED &&
          <div className={'status'}>
            <Row>
              <p>Your publish is complete! You are being redirected to it now.</p>
            </Row>
            <Row>
              <p>If you are not automatically redirected, <a className='link--primary' target='_blank' href={message}>click here.</a></p>
            </Row>
          </div>
        }
        {status === publishStates.FAILED &&
          <div className={'status'}>
            <Row>
              <p>Something went wrong...</p>
            </Row>
            <Row>
              <p className={'text--strong'}>{message}</p>
            </Row>
            <Row>
              <p>For help, post the above error text in the #speech channel on the <a className='link--primary' href='https://chat.lbry.io' target='_blank'>lbry discord</a></p>
            </Row>
            <Row>
              <ButtonSecondary
                value={'Reset'}
                onClickHandler={clearFile}
              />
            </Row>
          </div>
        }
        {status === publishStates.ABANDONING &&
          <div className={'status'}>
            <Row>
              <p>Your claim is being abandoned.</p>
            </Row>
          </div>
        }
      </div>
    );
  }
};

export default PublishStatus;
