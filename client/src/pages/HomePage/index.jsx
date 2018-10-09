import { connect } from 'react-redux';
import { onHandleShowHomepage } from '../../actions/show';
import View from './view';

const mapStateToProps = ({ show, site, channel }) => {
  return {
    error      : show.request.error,
    requestType: show.request.type,
    homeChannel: site.publishOnlyApproved && !channel.loggedInChannel.name ? `${site.approvedChannels[0].name}:${site.approvedChannels[0].longId}` : null,
  };
};

const mapDispatchToProps = {
  onHandleShowHomepage,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
