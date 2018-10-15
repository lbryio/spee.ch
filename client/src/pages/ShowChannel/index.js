import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show, site, channel }) => {
  // select request info
  const requestId = show.request.id;
  // select request
  const previousRequest = show.requestList[requestId] || null;
  // select channel
  let thisChannel;
  if (previousRequest) {
    const channelKey = previousRequest.key;
    thisChannel = show.channelList[channelKey] || null;
  }
  return {
    channel    : thisChannel,
    homeChannel: site.publishOnlyApproved && !channel.loggedInChannel.name ? `${site.approvedChannels[0].name}:${site.approvedChannels[0].longId}` : null,
  };
};

export default connect(mapStateToProps, null)(View);
