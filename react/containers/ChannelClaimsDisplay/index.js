import { connect } from 'react-redux';
import View from './view';
import {updateChannelClaimsData} from 'actions/show';

const mapStateToProps = ({ show }) => {
  return {
    name       : show.channel.name,
    id         : show.channel.id,
    claims     : show.channel.claimsData.claims,
    currentPage: show.channel.claimsData.currentPage,
    totalPages : show.channel.claimsData.totalPages,
    totalClaims: show.channel.claimsData.totalClaims,
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
