import { connect } from 'react-redux';
import { onHandleShowHomepage } from '../../actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    error      : show.request.error,
    requestType: show.request.type,
  };
};

const mapDispatchToProps = {
  onHandleShowHomepage,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
