import { updateChannelRequest, updateClaimRequest } from 'actions/show';
import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    channel: show.request.channel,
    claim  : show.request.claim,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChannelRequest: (channel) => {
      dispatch(updateChannelRequest(channel));
    },
    onClaimRequest: (claim) => {
      dispatch(updateClaimRequest(claim));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
