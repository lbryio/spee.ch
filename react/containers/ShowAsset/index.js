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
    name            : show.showAsset.name,
    claimData       : show.showAsset.claimData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // new
    onNewRequest: (id, name, modifier) => {
      dispatch(newAssetRequest(id, name, modifier));
    },
    onRequestError: (error) => {
      dispatch(updateRequestError(error, null, null));
    },
    onShowNewAsset: (id, name, claimId) => {
      dispatch(showNewAsset(id, name, claimId));
    },
    onShowExistingAsset: (error, name, claimId, shortId, claimData) => {
      dispatch(updateShowAsset(error, name, claimId, shortId, claimData));
    },
    onLeaveShowAsset: () => {
      dispatch(clearShowAsset()); // clear any errors
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
