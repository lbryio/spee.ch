import { connect } from 'react-redux';
import View from './view';
import { fileRequested } from 'actions/show';

const mapStateToProps = ({ show }) => {
  return {
    error    : show.showAsset.error,
    status   : show.showAsset.status,
    claimData: show.showAsset.claimData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFileRequest: (name, claimId) => {
      dispatch(fileRequested(name, claimId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
