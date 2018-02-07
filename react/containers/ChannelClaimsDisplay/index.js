import { connect } from 'react-redux';
import { updateChannelClaimsData } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show : { showChannel: { channelData, channelClaimsData } } }) => {
  return {
    name       : channelData.name,
    longId     : channelData.longId,
    claims     : channelClaimsData.claims,
    currentPage: channelClaimsData.currentPage,
    totalPages : channelClaimsData.totalPages,
    totalClaims: channelClaimsData.totalClaims,
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
