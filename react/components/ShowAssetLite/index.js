import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  // select name and claim id
  let name, claimId;
  const previousRequest = show.assetRequests[show.request.id];
  const assetKey = `a#${previousRequest.name}#${previousRequest.claimId}`;
  const asset = show.assetList[assetKey];
  if (asset) {
    name = asset.name;
    claimId = asset.claimId;
  };
  // return props
  return {
    name,
    claimId,
  };
};

export default connect(mapStateToProps, null)(View);
