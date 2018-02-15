import { connect } from 'react-redux';
import { handleShowPageUri } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    error      : show.request.error,
    requestType: show.request.type,
  };
};

const mapDispatchToProps = {
  handleShowPageUri,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
