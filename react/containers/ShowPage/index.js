import { connect } from 'react-redux';
import { updateRequestError, updateRequestWithChannelRequest, updateRequestWithAssetRequest } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    error      : show.request.error,
    requestType: show.request.type,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestError: (error) => {
      dispatch(updateRequestError(error));
    },
    onChannelRequest: (name, id) => {
      dispatch(updateRequestWithChannelRequest(name, id));
    },
    onAssetRequest: (name, id, channelName, channelId, extension) => {
      dispatch(updateRequestWithAssetRequest(name, id, channelName, channelId, extension));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
