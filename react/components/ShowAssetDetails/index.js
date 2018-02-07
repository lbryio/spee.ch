import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    claimData: show.showAsset.claimData,
  };
};

export default connect(mapStateToProps, null)(View);
