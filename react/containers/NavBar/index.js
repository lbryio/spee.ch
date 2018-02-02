import { connect } from 'react-redux';
import { updateLoggedInChannel } from 'actions/channel';
import View from './view';
import {updateSelectedChannel} from '../../actions/publish';

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
      dispatch(updateSelectedChannel(name));
    },
    onChannelLogout: () => {
      dispatch(updateLoggedInChannel(null, null, null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
