import {connect} from 'react-redux';
import View from './view';

const mapStateToProps = ({ publish }) => {
  return {
    file   : publish.file,
    status : publish.status.status,
    message: publish.status.message,
  };
};

export default connect(mapStateToProps, null)(View);
