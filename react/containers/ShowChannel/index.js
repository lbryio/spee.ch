import { connect } from 'react-redux';
import {updateChannelData, updateShowChannelError} from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    requestName: show.channelRequest.name,
    requestId  : show.channelRequest.id,
    error      : show.showChannel.error,
    name       : show.showChannel.channelData.name,
    shortId    : show.showChannel.channelData.shortId,
    longId     : show.showChannel.channelData.longId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowChannelError: (error) => {
      dispatch(updateShowChannelError(error));
    },
    onChannelDataUpdate: (name, longId, shortId) => {
      dispatch(updateChannelData(name, longId, shortId));
      dispatch(updateShowChannelError(null));  // clear any errors
    },
    onChannelDataClear: () => {
      dispatch(updateChannelData(null, null, null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
