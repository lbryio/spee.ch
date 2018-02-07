import { connect } from 'react-redux';
import View from './view';
import { updateAssetClaimData, updateShowAssetError } from 'actions/show';

const mapStateToProps = ({ show }) => {
  return {
    modifier : show.assetRequest.modifier,
    name     : show.assetRequest.name,
    extension: show.assetRequest.extension,
    error    : show.showAsset.error,
    claimData: show.showAsset.claimData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
