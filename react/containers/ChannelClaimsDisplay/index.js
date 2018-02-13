import { connect } from 'react-redux';
import { updateChannelClaimsAsync } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  // select channel key
  const request = show.channelRequests[show.request.id];
  const channelKey = `c#${request.name}#${request.longId}`;
  // select channel claims
  const channel = show.channelList[channelKey] || null;
  // return props
  return {
    channelKey,
    channel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChannelPageUpdate: (channelKey, name, longId, page) => {
      dispatch(updateChannelClaimsAsync(channelKey, name, longId, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
