import React from 'react';
import ErrorPage from 'components/ErrorPage';
import NavBar from 'containers/NavBar';
import ChannelClaimsDisplay from 'containers/ChannelClaimsDisplay';

import { CHANNEL } from 'constants/show_request_types';

function requestIsAChannelRequest ({ requestType }) {
  return requestType === CHANNEL;
}

function channelNameOrIdChanged (nextProps, props) {
  return (nextProps.requestChannelName !== props.requestChannelName || nextProps.requestChannelName !== props.requestChannelName);
}

class ShowChannel extends React.Component {
  componentDidMount () {
    console.log('showchannel did mount');
    const {requestId, requestChannelName, requestChannelId, requestList} = this.props;
    const existingRequest = requestList[requestId];
    if (existingRequest) {
      console.log('we got a repeat channel request on an unmounted ShowChannel component');
      this.onRepeatChannelRequest(existingRequest);
    } else {
      this.onNewChannelRequest(requestId, requestChannelName, requestChannelId);
    }
  }
  componentWillReceiveProps (nextProps) {
    console.log('showchannel will receive new props');
    if (requestIsAChannelRequest(nextProps) && channelNameOrIdChanged(nextProps, this.props)) {
      const {requestId, requestChannelName, requestChannelId, requestList} = nextProps;
      const existingRequest = requestList[requestId];
      if (existingRequest) {
        this.onRepeatChannelRequest(existingRequest);
      } else {
        console.log('we got a new channel request on a mounted ShowChannel component');
        this.onNewChannelRequest(requestId, requestChannelName, requestChannelId);
      }
    };
  }
  onNewChannelRequest (requestId, requestName, requestChannelId) {
    // validate the request (i.e. get channel full claim id)
    // update teh request list
    // if error, return early (set the request error in the store)
    // if the request is valid...
        // add it to the requestList
        // update showChannel to reflect the channel details
    this.props.onNewChannelRequest(requestId, requestName, requestChannelId);
  }
  onRepeatChannelRequest ({ id, error, name, claimId }) {
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
