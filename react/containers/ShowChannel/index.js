import { connect } from 'react-redux';
import { newChannelRequest } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  // select request info
  const requestId = show.request.id;
  const requestType = show.request.type;
  const requestChannelName = show.request.data.name;
  const requestChannelId = show.request.data.id;
  // select request
  const previousRequest = show.channelRequests[show.request.id] || null;
  // select channel
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
    channel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNewChannelRequest (requestId, requestChannelName, requestChannelId) {
      dispatch(newChannelRequest(requestId, requestChannelName, requestChannelId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
