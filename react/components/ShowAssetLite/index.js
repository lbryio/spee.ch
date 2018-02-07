import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    name   : show.showAsset.claimData.name,
    claimId: show.showAsset.claimData.claimId,
  };
};

export default connect(mapStateToProps, null)(View);
