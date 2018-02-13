import { connect } from 'react-redux';
import View from './view';
import { newAssetRequest, showNewAsset } from 'actions/show';

const mapStateToProps = ({ show }) => {
  // select request info
  const requestType = show.request.type;
  const requestId = show.request.id;
  const requestName = show.request.data.name;
  const requestModifier = show.request.data.modifier;
  const requestExtension = show.request.data.extension;
  // select request
  const previousRequest = show.assetRequests[show.request.id] || null;
  // select asset info
  let asset;
  if (previousRequest) {
    const assetKey = `a#${previousRequest.name}#${previousRequest.claimId}`;  // note: just store this in the request
    asset = show.assetList[assetKey] || null;
  };
  // return props
  return {
    requestType,
    requestId,
    requestName,
    requestModifier,
    requestExtension,
    previousRequest,
    asset,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // request
    onNewRequest: (id, name, modifier) => {
      dispatch(newAssetRequest(id, name, modifier));
    },
    // show asset
    onShowNewAsset: (name, claimId) => {
      dispatch(showNewAsset(name, claimId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
