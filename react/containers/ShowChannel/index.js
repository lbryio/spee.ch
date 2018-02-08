import { connect } from 'react-redux';
import {newChannelRequest, updateRequestError, clearShowChannel} from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    requestId         : show.request.id,
    requestType       : show.request.type,
    requestChannelName: show.request.data.name,
    requestChannelId  : show.request.data.id,
    requestList       : show.channelRequests,
    channels          : show.channels,
    error             : show.showChannel.error,
    name              : show.showChannel.channelData.name,
    shortId           : show.showChannel.channelData.shortId,
    longId            : show.showChannel.channelData.longId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNewChannelRequest (id, name, channelId) {
      dispatch(newChannelRequest(id, name, channelId));
    },
    onRequestError: (error) => {
      dispatch(updateRequestError(error, null, null));
    },
    onShowChannelClear: () => {
      dispatch(clearShowChannel());
    },
    // onShowChannelError: (error) => {
    //   dispatch(updateShowChannelError(error));
    // },
    // onChannelDataUpdate: (name, longId, shortId) => {
    //   dispatch(updateChannelData(name, longId, shortId));
    //   dispatch(updateShowChannelError(null));  // clear any errors
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
