import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  let props = {};
  // select name and claim id
  const previousRequest = show.assetRequests[show.request.id];
  const assetKey = `a#${previousRequest.name}#${previousRequest.claimId}`;
  const asset = show.assetList[assetKey];
  if (asset) {
    props['name'] = asset.name;
    props['claimId'] = asset.claimId;
  };
  return props;
};

export default connect(mapStateToProps, null)(View);
