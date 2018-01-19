import { connect } from 'react-redux';
import { updateLoggedInChannel } from 'actions/channel';
import View from './view';
import {updateSelectedChannel} from '../../actions/publish';

const mapDispatchToProps = dispatch => {
  return {
    onChannelLogin: (name, shortId, longId) => {
      dispatch(updateLoggedInChannel(name, shortId, longId));
      dispatch(updateSelectedChannel(name));
    },
  };
};

export default connect(null, mapDispatchToProps)(View);
