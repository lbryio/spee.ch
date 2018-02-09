import { connect } from 'react-redux';
import View from './view';
import { newAssetRequest, updateRequestError, showNewAsset, updateShowAsset, clearShowAsset } from 'actions/show';

const mapStateToProps = ({ show }) => {
  return {
    // request
    requestId       : show.request.id,
    requestName     : show.request.data.name,
    requestModifier : show.request.data.modifier,
    requestExtension: show.request.data.extension,
    assetRequests   : show.assetRequests,
    assetList       : show.assetList,
    // show asset
    error           : show.showAsset.error,
    id              : show.showAsset.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // request
    onNewRequest: (id, name, modifier) => {
      dispatch(newAssetRequest(id, name, modifier));
    },
    onRequestError: (error) => {
      dispatch(updateRequestError(error, null, null));
    },
    // show asset
    onShowNewAsset: (name, claimId) => {
      dispatch(showNewAsset(name, claimId));
    },
    onShowExistingAsset: (assetId) => {
      dispatch(updateShowAsset(null, assetId));
    },
    onLeaveShowAsset: () => {
      dispatch(clearShowAsset()); // clear any errors
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
