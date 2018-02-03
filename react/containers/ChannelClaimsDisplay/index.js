import { connect } from 'react-redux';
import { updateChannelClaimsData } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    claims     : show.showChannel.channelClaimsData.claims,
    currentPage: show.showChannel.channelClaimsData.currentPage,
    totalPages : show.showChannel.channelClaimsData.totalPages,
    totalClaims: show.showChannel.channelClaimsData.totalClaims,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChannelClaimsDataUpdate: (claims, currentPage, totalPages, totalClaims) => {
      dispatch(updateChannelClaimsData(claims, currentPage, totalPages, totalClaims));
    },
    onChannelClaimsDataClear: () => {
      dispatch(updateChannelClaimsData(null, null, null, null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
