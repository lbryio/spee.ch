import {connect} from 'react-redux';
import View from './view';

const mapStateToProps = ({ publish }) => {
  return {
    disabled: publish.disabled,
    file    : publish.file,
    status  : publish.status.status,
    isUpdate: publish.isUpdate,
  };
};

export default connect(mapStateToProps, null)(View);
