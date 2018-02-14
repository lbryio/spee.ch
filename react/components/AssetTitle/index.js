import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  // select title
  const request = show.previousRequests[show.request.id];
  const assetKey = request.key;
  const asset = show.assetList[assetKey];
  let title;
  if (asset) {
    title = asset.claimData.title;
  };
  //  return props
  return {
    title,
  };
};

export default connect(mapStateToProps, null)(View);
