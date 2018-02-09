import { connect } from 'react-redux';
import { } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    channel: show.channelList[show.showChannel.id],
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
