import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  let props = {};
  // select name and claim id
  const existingRequest = show.assetRequests[show.request.id];
  const assetKey = `a#${existingRequest.name}#${existingRequest.claimId}`;
  const existingAsset = show.assetList[assetKey];
  if (existingAsset) {
    props['name'] = existingAsset.name;
    props['claimId'] = existingAsset.claimId;
  };
  return props;
};

export default connect(mapStateToProps, null)(View);
