import { connect } from 'react-redux';
import View from './view';
import { newAssetRequest, updateAssetClaimData, updateShowAssetError } from 'actions/show';

const mapStateToProps = ({ show }) => {
  return {
    // new
    request      : show.assetRequest,
    assetRequests: show.assetRequests,
    extension    : show.assetRequest.extension,
    // old
    error    : show.showAsset.error,
    claimData: show.showAsset.claimData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // new
    onNewAssetRequest (name, modifier) {
      dispatch(newAssetRequest(name, modifier));
    },
    // old
    onShowAssetError: (error) => {
      dispatch(updateShowAssetError(error));
    },
    onAssetClaimDataUpdate: (claimData, shortId) => {
      dispatch(updateAssetClaimData(claimData, shortId));
      dispatch(updateShowAssetError(null)); // clear any errors
    },
    onAssetClaimDataClear: () => {
      dispatch(updateAssetClaimData(null, null));
      dispatch(updateShowAssetError(null)); // clear any errors
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
