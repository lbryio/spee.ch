import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    requestName: show.channelRequest.name,
    requestId  : show.channelRequest.id,
  };
};

export default connect(mapStateToProps, null)(View);
