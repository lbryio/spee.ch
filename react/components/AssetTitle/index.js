import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  let props = {};
  // select title
  const existingRequest = show.assetRequests[show.request.id];
  const assetKey = `a#${existingRequest.name}#${existingRequest.claimId}`;
  const existingAsset = show.assetList[assetKey];
  if (existingAsset) {
    props['title'] = existingAsset.claimData.title;
  };
  return props;
};

export default connect(mapStateToProps, null)(View);
