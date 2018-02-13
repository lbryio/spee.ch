import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  let props = {};
  // select title
  const existingRequest = show.assetRequests[show.request.id];
  const assetKey = `a#${existingRequest.name}#${existingRequest.claimId}`;
  const asset = show.assetList[assetKey];
  if (asset) {
    props['title'] = asset.claimData.title;
  };
  return props;
};

export default connect(mapStateToProps, null)(View);
