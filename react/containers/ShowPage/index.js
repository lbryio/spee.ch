import { connect } from 'react-redux';
import { updateRequestWithChannelRequest, updateRequestWithAssetRequest } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    requestType: show.requestType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChannelRequest: (name, id) => {
      dispatch(updateRequestWithChannelRequest(name, id));
    },
    onAssetRequest: (name, id, channelName, channelId, extension) => {
      dispatch(updateRequestWithAssetRequest(name, id, channelName, channelId, extension));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
