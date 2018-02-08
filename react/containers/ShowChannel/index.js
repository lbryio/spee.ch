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
    onShowNewChannel: (id, channelData) => {
      dispatch(showNewChannel(id, channelData));
    },
    onShowExistingChannel: (error, name, shortId, longId, claimData) => {
      dispatch(updateShowChannel(error, name, shortId, longId, claimData));
    },
    onShowChannelClear: () => {
      dispatch(clearShowChannel());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
