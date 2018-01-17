import {connect} from 'react-redux';
import View from './view.jsx';

const mapStateToProps = state => {
  return {
    file   : state.file,
    status : state.status.status,
    message: state.status.message,
  };
};

export default connect(mapStateToProps, null)(View);
