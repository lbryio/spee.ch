import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    asset: show.assetList[show.showAsset.id],
  };
};

export default connect(mapStateToProps, null)(View);
