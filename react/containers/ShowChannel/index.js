import { connect } from 'react-redux';
import {newChannelRequest, updateRequestError, showNewChannel, updateShowChannel, clearShowChannel} from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    // request
    requestId         : show.request.id,
    requestType       : show.request.type,
    requestChannelName: show.request.data.name,
    requestChannelId  : show.request.data.id,
    requestList       : show.channelRequests,
    channelList       : show.channelList,
    // show channel
    error             : show.showChannel.error,
    id                : show.showChannel.id,
    channel           : show.channelList[show.showChannel.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // request
    onNewChannelRequest (id, name, channelId) {
      dispatch(newChannelRequest(id, name, channelId));
    },
    onRequestError: (error) => {
      dispatch(updateRequestError(error, null, null));
    },
    // show channel
    onShowNewChannel: (channelData) => {
      dispatch(showNewChannel(channelData));
    },
    onShowExistingChannel: (id) => {
      dispatch(updateShowChannel(null, id));
    },
    onShowChannelClear: () => {
      dispatch(clearShowChannel());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
