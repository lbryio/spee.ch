import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    title: show.assetList[show.showAsset.id].claimData.title,
  };
};

export default connect(mapStateToProps, null)(View);
