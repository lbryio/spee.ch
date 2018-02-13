import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  // select title
  const request = show.assetRequests[show.request.id];
  const assetKey = `a#${request.name}#${request.claimId}`;
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
