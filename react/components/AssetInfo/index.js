import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  // select asset
  const request = show.assetRequests[show.request.id];
  const assetKey = `a#${request.name}#${request.claimId}`;
  const asset = show.assetList[assetKey];
  //  return props
  return {
    asset,
  };
};

export default connect(mapStateToProps, null)(View);
