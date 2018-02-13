import { connect } from 'react-redux';
import View from './view';
import { fileRequested } from 'actions/show';

const mapStateToProps = ({ show }) => {
  let props = {
    error : show.displayAsset.error,
    status: show.displayAsset.status,
  };
  // select asset info
  const previousRequest = show.assetRequests[show.request.id];
  const assetKey = `a#${previousRequest.name}#${previousRequest.claimId}`;
  const asset = show.assetList[assetKey];
  if (asset) {
    props['asset'] = asset;
  };
  return props;
};

const mapDispatchToProps = dispatch => {
  return {
    onFileRequest: (name, claimId) => {
      dispatch(fileRequested(name, claimId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
