import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ publish }) => {
  return {
    message: publish.disabledMessage,
  };
};

export default connect(mapStateToProps, null)(View);
