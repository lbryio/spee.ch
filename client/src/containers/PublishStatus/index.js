import {connect} from 'react-redux';
import {clearFile} from '../../actions/publish';
import View from './view';

const mapStateToProps = ({ publish }) => {
  return {
    status : publish.status.status,
    message: publish.status.message,
  };
};

const mapDispatchToProps = {
  clearFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
