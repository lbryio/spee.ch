import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  console.log('mapping state to props', show);
  // select request info
  const requestId = show.request.id;
  // select asset info
  let asset;
  const previousRequest = show.assetRequests[requestId] || null;
  const assetList = show.assetList;
  if (previousRequest) {
    const assetKey = `a#${previousRequest.name}#${previousRequest.claimId}`;  // note: just store this in the request
    asset = assetList[assetKey] || null;
  };
  // return props
  return {
    asset,
  };
};

export default connect(mapStateToProps, null)(View);
