import { connect } from 'react-redux';
import { logOutChannel, checkForLoggedInChannel } from '../../actions/channel';
import View from './view';

const mapStateToProps = ({ channel, site }) => {
  return {
    channelName   : channel.loggedInChannel.name,
    channelShortId: channel.loggedInChannel.shortId,
    channelLongId : channel.loggedInChannel.longId,
    siteDescription: site.description,
  };
};

const mapDispatchToProps = {
  checkForLoggedInChannel,
  logOutChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
