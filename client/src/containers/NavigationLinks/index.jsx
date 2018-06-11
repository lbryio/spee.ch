import { connect } from 'react-redux';
import { logOutChannel, checkForLoggedInChannel } from '../../actions/channel';
import View from './view';

const mapStateToProps = ({ channel: { loggedInChannel: { name, shortId, longId } } }) => {
  return {
    channelName   : name,
    channelShortId: shortId,
    channelLongId : longId,
  };
};

const mapDispatchToProps = {
  checkForLoggedInChannel,
  logOutChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
