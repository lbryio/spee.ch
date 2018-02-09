import { connect } from 'react-redux';
import { updateChannelClaimsAsync } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    showChannelId: show.showChannel.id,
    channel      : show.channelList[show.showChannel.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChannelPageUpdate: (showChannelId, name, longId, page) => {
      dispatch(updateChannelClaimsAsync(showChannelId, name, longId, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
