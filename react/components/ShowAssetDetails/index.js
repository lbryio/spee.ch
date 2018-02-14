import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  console.log('mapping state to props', show);
  // select request info
  const requestId = show.request.id;
  // select asset info
  let asset;
  const request = show.previousRequests[requestId] || null;
  const assetList = show.assetList;
  if (request && assetList) {
    const assetKey = request.key;  // note: just store this in the request
    asset = assetList[assetKey] || null;
  };
  // return props
  return {
    asset,
  };
};

export default connect(mapStateToProps, null)(View);
