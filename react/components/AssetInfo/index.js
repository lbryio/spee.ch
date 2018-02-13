import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  let props = {};
  // select asset info
  const request = show.assetRequests[show.request.id];
  const assetKey = `a#${request.name}#${request.claimId}`;
  const asset = show.assetList[assetKey];
  if (asset) {
    props['asset'] = asset;
  };
  return props;
};

export default connect(mapStateToProps, null)(View);
