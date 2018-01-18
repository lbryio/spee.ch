import { connect } from 'react-redux';
import { updateLoggedInChannel } from 'actions/channel';
import View from './view';

const mapStateToProps = ({ channel }) => {
  return {
    channelName   : channel.loggedInChannel.name,
    channelShortId: channel.loggedInChannel.shortId,
    channelLongId : channel.loggedInChannel.longId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChannelLogin: (name, shortId, longId) => {
      dispatch(updateLoggedInChannel(name, shortId, longId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
