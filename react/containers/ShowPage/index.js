import { connect } from 'react-redux';
import { onRequestError, onParsedChannelRequest, onParsedAssetRequest } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    error      : show.request.error,
    requestType: show.request.type,
  };
};

const mapDispatchToProps = () => {
  return {
    onRequestError,
    onParsedChannelRequest,
    onParsedAssetRequest,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
