import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  let props = {};
  // select name and claim id
  const existingRequest = show.assetRequests[show.request.id];
  const assetKey = `a#${existingRequest.name}#${existingRequest.claimId}`;
  const asset = show.assetList[assetKey];
  if (asset) {
    props['name'] = asset.name;
    props['claimId'] = asset.claimId;
  };
  return props;
};

export default connect(mapStateToProps, null)(View);
