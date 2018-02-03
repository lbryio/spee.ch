import { connect } from 'react-redux';
import View from './view';
import { updateAssetClaimData } from 'actions/show';

const mapStateToProps = ({ show }) => {
  return {
    modifier : show.assetRequest.modifier,
    claim    : show.assetRequest.name,
    extension: show.assetRequest.extension,
    claimData: show.showAsset.claimData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAssetClaimDataUpdate: (claimData) => {
      dispatch(updateAssetClaimData(claimData));
    },
    onAssetClaimDataClear: () => {
      dispatch(updateAssetClaimData(null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
