import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ channel }) => {
  return {
    channelName   : channel.loggedInChannel.name,
    channelShortId: channel.loggedInChannel.shortId,
    channelLongId : channel.loggedInChannel.longId,
  };
};

export default connect(mapStateToProps, null)(View);
