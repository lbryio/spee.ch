import { connect } from 'react-redux';
import View from './view';
import { newAssetRequest, showNewAsset } from 'actions/show';

const mapStateToProps = ({ show }) => {
  let props = {};
  props['requestType'] = show.request.type;
  props['requestId'] = show.request.id;
  props['requestName'] = show.request.data.name;
  props['requestModifier'] = show.request.data.modifier;
  props['requestExtension'] = show.request.data.extension;
  // select request
  const existingRequest = show.assetRequests[show.request.id];
  if (existingRequest) {
    props['existingRequest'] = existingRequest;
    // select asset info
    const assetKey = `a#${existingRequest.name}#${existingRequest.claimId}`;  // note: just store this in the request
    const existingAsset = show.assetList[assetKey];
    if (existingAsset) {
      console.log('existing asset found', existingAsset);
      props['asset'] = existingAsset;
    };
  };
  return props;
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
