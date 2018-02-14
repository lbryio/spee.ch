import { connect } from 'react-redux';
import View from './view';
import { onNewAssetRequest } from 'actions/show';

const mapStateToProps = ({ show }) => {
  // select request info
  const requestId = show.request.id;
  const requestName = show.request.data.name;
  const requestModifier = show.request.data.modifier;
  const requestExtension = show.request.data.extension;
  const assetList = show.assetList;
  // select asset info
  const previousRequest = show.assetRequests[show.request.id] || null;
  let asset;
  if (previousRequest) {
    const assetKey = `a#${previousRequest.name}#${previousRequest.claimId}`;  // note: just store this in the request
    asset = assetList[assetKey] || null;
  };
  // return props
  return {
    requestId,
    requestName,
    requestModifier,
    requestExtension,
    asset,
  };
};

const mapDispatchToProps = () => {
  return {
    onNewAssetRequest,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
