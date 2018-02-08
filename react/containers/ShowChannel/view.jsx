import React from 'react';
import ErrorPage from 'components/ErrorPage';
import NavBar from 'containers/NavBar';
import ChannelClaimsDisplay from 'containers/ChannelClaimsDisplay';

import { CHANNEL } from 'constants/show_request_types';

function requestIsAChannelRequest ({ requestType }) {
  return requestType === CHANNEL;
}

function requestIsNewRequest (nextProps, props) {
  return (nextProps.requestId !== props.requestId);
}

class ShowChannel extends React.Component {
  componentDidMount () {
    const {requestId, requestChannelName, requestChannelId, requestList} = this.props;
    const existingRequest = requestList[requestId];
    if (existingRequest) {
      this.onRepeatChannelRequest(existingRequest);
    } else {
      this.onNewChannelRequest(requestId, requestChannelName, requestChannelId);
    }
  }
  componentWillReceiveProps (nextProps) {
    if (requestIsAChannelRequest(nextProps) && requestIsNewRequest(nextProps, this.props)) {
      const {requestId, requestChannelName, requestChannelId, requestList} = nextProps;
      const existingRequest = requestList[requestId];
      if (existingRequest) {
        this.onRepeatChannelRequest(existingRequest);
      } else {
        this.onNewChannelRequest(requestId, requestChannelName, requestChannelId);
      }
    };
  }
  onNewChannelRequest (requestId, requestName, requestChannelId) {
    console.log('new request');
    this.props.onNewChannelRequest(requestId, requestName, requestChannelId);
  }
  onRepeatChannelRequest ({ id, error, data: { channelName, longChannelClaimId} }) {
    // if error, return and update state with error
    if (error) {
      return this.props.onRequestError(error);
    }
    // if no error, get the channel's claims data
  }
  componentWillUnmount () {
    this.props.onShowChannelClear();
  }
  render () {
    const { error, name, longId, shortId } = this.props;
    if (error) {
      return (
        <ErrorPage error={error}/>
      );
    };
    return (
      <div>
        <NavBar/>
        <div className="row row--tall row--padded">
          <div className="column column--10">
            <h2>channel name: {name ? name : 'loading...'}</h2>
            <p className={'fine-print'}>full channel id: {longId ? longId : 'loading...'}</p>
            <p className={'fine-print'}>short channel id: {shortId ? shortId : 'loading...'}</p>
          </div>
          <div className="column column--10">
            {(name && longId) && <ChannelClaimsDisplay />}
          </div>
        </div>
      </div>
    );
  }
};

export default ShowChannel;
