import { connect } from 'react-redux';
import { updateAssetData } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    modifier : show.assetRequest.modifier,
    claim    : show.assetRequest.name,
    extension: show.assetRequest.extension,
    claimData: show.assetData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAssetDataUpdate: (data) => {
      dispatch(updateAssetData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
