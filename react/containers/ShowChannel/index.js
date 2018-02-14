import { connect } from 'react-redux';
import { onNewChannelRequest } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  // select request info
  const requestId = show.request.id;
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
    requestChannelName,
    requestChannelId,
    channel,
  };
};

const mapDispatchToProps = () => {
  return {
    onNewChannelRequest,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
