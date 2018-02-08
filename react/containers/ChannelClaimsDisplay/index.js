import { connect } from 'react-redux';
import { updateChannelClaimsData } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show : { showChannel: { error, channelData, claimsData } } }) => {
  return {
    error      : error,
    name       : channelData.name,
    longId     : channelData.longId,
    claims     : claimsData.claims,
    currentPage: claimsData.currentPage,
    totalPages : claimsData.totalPages,
    totalClaims: claimsData.totalClaims,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onChannelClaimsDataUpdate: (claims, currentPage, totalPages, totalClaims) => {
//       dispatch(updateChannelClaimsData(claims, currentPage, totalPages, totalClaims));
//     },
//     onChannelClaimsDataClear: () => {
//       dispatch(updateChannelClaimsData(null, null, null, null));
//     },
//   };
// };

export default connect(mapStateToProps, null)(View);
