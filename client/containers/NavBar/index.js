import { connect } from 'react-redux';
import { updateLoggedInChannel } from 'actions/channel';
import {updateSelectedChannel} from 'actions/publish';
import View from './view';

const mapStateToProps = ({ channel, site }) => {
  return {
    channelName   : channel.loggedInChannel.name,
    channelShortId: channel.loggedInChannel.shortId,
    channelLongId : channel.loggedInChannel.longId,
    siteDescription: site.description,
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
