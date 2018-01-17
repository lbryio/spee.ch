import {connect} from 'react-redux';
import {setPublishInChannel} from 'actions';
import View from './view.jsx';

const mapStateToProps = state => {
  return {
    loggedInChannelName: state.loggedInChannel.name,
    publishInChannel   : state.publishInChannel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPublishInChannelChange: (value) => {
      dispatch(setPublishInChannel(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
