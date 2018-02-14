import React from 'react';
import ErrorPage from 'components/ErrorPage';
import NavBar from 'containers/NavBar';
import ChannelClaimsDisplay from 'containers/ChannelClaimsDisplay';

import { CHANNEL } from 'constants/show_request_types';

function requestIsAChannelRequest ({ requestType }) {
  return requestType === CHANNEL;
}

class ShowChannel extends React.Component {
  componentDidMount () {
    const { channel, requestId, requestChannelName, requestChannelId } = this.props;
    if (!channel) {
      return this.props.onNewChannelRequest(requestId, requestChannelName, requestChannelId);
    }
  }
  componentWillReceiveProps (nextProps) {
    if (requestIsAChannelRequest(nextProps)) {
      const { channel, requestId, requestChannelName, requestChannelId } = nextProps;
      if (!channel) {
        return this.props.onNewChannelRequest(requestId, requestChannelName, requestChannelId);
      }
    }
  }
  render () {
    const { channel } = this.props;
    if (channel) {
      const { name, longId, shortId } = channel;
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
              <ChannelClaimsDisplay />
            </div>
          </div>
        </div>
      );
    };
    return (
      <ErrorPage error={'loading channel data...'}/>
    );
  }
};

export default ShowChannel;
