import { connect } from 'react-redux';
import View from './view';
import { fileRequested } from 'actions/show';

const mapStateToProps = ({ show }) => {
  // select error and status
  const error  = show.displayAsset.error;
  const status = show.displayAsset.status;
  // select asset
  const request = show.previousRequests[show.request.id];
  const assetKey = request.key;
  const asset = show.assetList[assetKey];
  //  return props
  return {
    error,
    status,
    asset,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFileRequest: (name, claimId) => {
      dispatch(fileRequested(name, claimId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
