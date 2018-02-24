import { connect } from 'react-redux';
import { onHandleShowPageUri } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    error      : show.request.error,
    requestType: show.request.type,
  };
};

const mapDispatchToProps = {
  onHandleShowPageUri,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
