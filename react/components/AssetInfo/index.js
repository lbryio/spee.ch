import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  // select asset
  const request = show.previousRequests[show.request.id];
  const assetKey = request.key;
  const asset = show.assetList[assetKey];
  //  return props
  return {
    asset,
  };
};

export default connect(mapStateToProps, null)(View);
