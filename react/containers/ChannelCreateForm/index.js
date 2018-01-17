import { connect } from 'react-redux';
import { updateLoggedInChannel } from '../../actions';
import View from './view.jsx';

const mapDispatchToProps = dispatch => {
  return {
    onChannelLogin: (name, shortId, longId) => {
      dispatch(updateLoggedInChannel(name, shortId, longId));
    },
  };
};

export default connect(null, mapDispatchToProps)(View);
