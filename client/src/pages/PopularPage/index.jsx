import { connect } from 'react-redux';
import { onHandleShowHomepage } from '../../actions/show';
import View from './view';

const mapStateToProps = ({ show, site, channel }) => {
  return {
    error      : show.request.error,
    requestType: show.request.type,
    homeChannel: 'special:trending',
  };
};

const mapDispatchToProps = {
  onHandleShowHomepage,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
