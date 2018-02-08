import { connect } from 'react-redux';
import View from './view';
import { newAssetRequest, updateRequestError, showNewAsset, updateShowAsset, clearShowAsset } from 'actions/show';

const mapStateToProps = ({ show }) => {
  return {
    // new
    requestName     : show.assetRequest.name,
    requestModifier : show.assetRequest.modifier,
    requestExtension: show.assetRequest.extension,
    assetRequests   : show.assetRequests,
    assets          : show.assets,
    // old
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
    onShowExistingAsset: (id, error, name, claimId, shortId, claimData) => {
      dispatch(updateShowAsset(id, error, name, claimId, shortId, claimData));
    },
    onLeaveShowAsset: () => {
      dispatch(clearShowAsset()); // clear any errors
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
