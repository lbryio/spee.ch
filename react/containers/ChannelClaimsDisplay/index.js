import { connect } from 'react-redux';
import View from './view';
import {updateChannelClaimsData} from 'actions/show';

const mapStateToProps = ({ show }) => {
  return {
    name       : show.channelData.name,
    longId     : show.channelData.longId,
    claims     : show.channelClaimsData.claims,
    currentPage: show.channelClaimsData.currentPage,
    totalPages : show.channelClaimsData.totalPages,
    totalClaims: show.channelClaimsData.totalClaims,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClaimsDataChange: (claims, currentPage, totalPages, totalClaims) => {
      dispatch(updateChannelClaimsData(claims, currentPage, totalPages, totalClaims));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
