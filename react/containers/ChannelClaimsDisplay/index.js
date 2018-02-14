import { connect } from 'react-redux';
import { onUpdateChannelClaims } from 'actions/show';
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

const mapDispatchToProps = () => {
  return {
    onUpdateChannelClaims,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
