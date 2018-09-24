import { connect } from 'react-redux';
import { clearFile, startPublish, abandonClaim } from '../../actions/publish';
import { selectAsset } from '../../selectors/show';
import View from './view';

const mapStateToProps = ({ show, publish }) => {
  return {
    file    : publish.file,
    isUpdate: publish.isUpdate,
    asset   : selectAsset(show),
  };
};

const mapDispatchToProps = {
  clearFile,
  startPublish,
  abandonClaim,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
