import {connect} from 'react-redux';
import {setPublishInChannel, updateSelectedChannel, updateError} from '../../actions/publish';
// import isApprovedChannel from '../../../../utils/isApprovedChannel';
import View from './view';

const mapStateToProps = ({ publish, site, channel: { loggedInChannel: { name, shortId, longId } } }) => {
  return {
    // isApprovedChannel  : isApprovedChannel({ longId }, site.approvedChannels),
    publishOnlyApproved: site.publishOnlyApproved,
    // closedRegistration : site.closedRegistration,
    loggedInChannelName: name,
    publishInChannel   : publish.publishInChannel,
    selectedChannel    : publish.selectedChannel,
    channelError       : publish.error.channel,
    longId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPublishInChannelChange: (value) => {
      dispatch(updateError('channel', null));
      dispatch(setPublishInChannel(value));
    },
    onChannelSelect: (value) => {
      dispatch(updateError('channel', null));
      dispatch(updateSelectedChannel(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
