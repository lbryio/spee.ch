import { connect } from 'react-redux';
import View from './view';
import { updateAssetClaimData } from 'actions/show';

const mapStateToProps = ({ show }) => {
  return {
    modifier : show.assetRequest.modifier,
    claim    : show.assetRequest.name,
    extension: show.assetRequest.extension,
    claimData: show.showAsset.claimData.data,
    shortId  : show.showAsset.claimData.shortId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAssetClaimDataUpdate: (claimData, shortId) => {
      dispatch(updateAssetClaimData(claimData, shortId));
    },
    onAssetClaimDataClear: () => {
      dispatch(updateAssetClaimData(null, null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
