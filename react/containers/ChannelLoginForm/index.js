import { connect } from 'react-redux';
import { updateLoggedInChannel } from 'actions/channel';
import View from './view';

const mapDispatchToProps = dispatch => {
  return {
    onChannelLogin: (name, shortId, longId) => {
      dispatch(updateLoggedInChannel(name, shortId, longId));
    },
  };
};

export default connect(null, mapDispatchToProps)(View);
