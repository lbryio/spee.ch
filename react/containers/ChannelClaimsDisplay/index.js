import { connect } from 'react-redux';
import { } from 'actions/show';
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
//     onChannelPageUpdate: (channelRecordId, name, longId, page) => {
//       dispatch(updateChannelClaims(channelRecordId, name, longId, page));
//     },
//   };
// };

export default connect(mapStateToProps, null)(View);
