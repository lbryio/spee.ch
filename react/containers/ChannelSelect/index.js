import {connect} from 'react-redux';
import {setPublishInChannel, updateSelectedChannel} from 'actions/publish';
import View from './view.jsx';

const mapStateToProps = ({ channel, publish }) => {
  return {
    loggedInChannelName: channel.loggedInChannel.name,
    publishInChannel   : publish.publishInChannel,
    selectedChannel    : publish.selectedChannel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPublishInChannelChange: (value) => {
      dispatch(setPublishInChannel(value));
    },
    onChannelSelect: (value) => {
      dispatch(updateSelectedChannel(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
