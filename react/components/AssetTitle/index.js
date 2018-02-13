import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  let props = {};
  // select title
  const previousRequest = show.assetRequests[show.request.id];
  const assetKey = `a#${previousRequest.name}#${previousRequest.claimId}`;
  const asset = show.assetList[assetKey];
  if (asset) {
    props['title'] = asset.claimData.title;
  };
  return props;
};

export default connect(mapStateToProps, null)(View);
