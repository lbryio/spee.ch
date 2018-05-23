import { connect } from 'react-redux';
import { updateLoggedInChannel } from '../../actions/channel';
import { updateSelectedChannel } from '../../actions/publish';
import View from './view';

const mapDispatchToProps = dispatch => {
  return {
    onChannelLogin: (name, shortId, longId) => {
      dispatch(updateLoggedInChannel(name, shortId, longId));
      dispatch(updateSelectedChannel(name));
    },
  };
};

export default connect(null, mapDispatchToProps)(View);
