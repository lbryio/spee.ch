import { connect } from 'react-redux';
import View from './view';
import {
  updateChannelAvailability,
  updateChannelCreateName,
  updateChannelCreatePassword,
  createChannel
} from '../../actions/channelCreate';

const mapStateToProps = ({channelCreate: {name, password, error, status }}) => {
  return {
    name,
    password,
    error,
    status,
  }
};

const mapDispatchToProps = {
  updateChannelAvailability,
  updateChannelCreateName,
  updateChannelCreatePassword,
  createChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
