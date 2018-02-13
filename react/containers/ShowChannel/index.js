
import { connect } from 'react-redux';
import { newChannelRequest, showNewChannel } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  let props = {};
  props['requestId'] = show.request.id;
  props['requestType'] = show.request.type;
  props['requestChannelName'] = show.request.data.name;
  props['requestChannelId'] = show.request.data.id;
  // select request
  const existingRequest = show.channelRequests[show.request.id];
  if (existingRequest) {
    props['existingRequest'] = existingRequest;
    console.log('existing channel request found', existingRequest);
    // select channel info
    const channelKey = `c#${existingRequest.name}#${existingRequest.longId}`;
    const channel = show.channelList[channelKey];
    if (channel) {
      props['channel'] = channel;
    };
  }
  return props;
};

const mapDispatchToProps = dispatch => {
  return {
    // request
    onNewChannelRequest (requestId, requestChannelName, requestChannelId) {
      dispatch(newChannelRequest(requestId, requestChannelName, requestChannelId));
    },
    // show channel
    onShowNewChannel: (name, shortId, longId) => {
      dispatch(showNewChannel(name, shortId, longId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
