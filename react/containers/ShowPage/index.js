import { connect } from 'react-redux';
import { onRequestError, onNewChannelRequest, onNewAssetRequest } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    error      : show.request.error,
    requestType: show.request.type,
  };
};

const mapDispatchToProps = {
  onRequestError,
  onNewChannelRequest,
  onNewAssetRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
