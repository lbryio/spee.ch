
import { connect } from 'react-redux';
import { newChannelRequest, showNewChannel } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  // select request info
  const requestId = show.request.id;
  const requestType = show.request.type;
  const requestChannelName = show.request.data.name;
  const requestChannelId = show.request.data.id;
  // select request
  const previousRequest = show.channelRequests[show.request.id] || null;
  // select channel info
  let channel;
  if (previousRequest) {
    const channelKey = `c#${previousRequest.name}#${previousRequest.longId}`;
    channel = show.channelList[channelKey] || null;
  }
  return {
    requestId,
    requestType,
    requestChannelName,
    requestChannelId,
    previousRequest,
    channel,
  };
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
