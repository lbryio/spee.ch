import { connect } from 'react-redux';
import View from './view';
import { fileRequested } from '../../actions/show';
import { selectAsset } from '../../selectors/show';

const mapStateToProps = (props) => {
  const {show} = props;
  // select error and status
  const error  = show.displayAsset.error;
  const status = show.displayAsset.status;
  // select asset
  const asset = selectAsset(show);
  //  return props
  return {
    error,
    status,
    asset,
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
