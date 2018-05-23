import {connect} from 'react-redux';
import View from './view';

const mapStateToProps = ({ channel }) => {
  return {
    loggedInChannelName: channel.loggedInChannel.name,
  };
};

export default connect(mapStateToProps, null)(View);
