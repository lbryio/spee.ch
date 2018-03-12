import {connect} from 'react-redux';
import View from './view';

const mapStateToProps = ({ publish }) => {
  return {
    disabled       : publish.disabled,
    disabledMessage: publish.disabledMessage,
    file           : publish.file,
    status         : publish.status.status,
  };
};

export default connect(mapStateToProps, null)(View);
