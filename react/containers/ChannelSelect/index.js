import {connect} from 'react-redux';
import {setPublishInChannel} from 'actions/publish';
import View from './view.jsx';

const mapStateToProps = ({ channel, publish }) => {
  return {
    loggedInChannelName: channel.loggedInChannel.name,
    publishInChannel   : publish.publishInChannel,
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
