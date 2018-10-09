import { connect } from 'react-redux';
import { logOutChannel, checkForLoggedInChannel } from '../../actions/channel';
import isApprovedChannel from '../../../../utils/isApprovedChannel';
import View from './view';

const mapStateToProps = ({ site, channel: { loggedInChannel: { name, shortId, longId } } }) => {
  return {
    showPublish       : (!site.publishOnlyApproved || isApprovedChannel({ longId }, site.approvedChannels)),
    closedRegistration: site.closedRegistration,
    channelName       : name,
    channelShortId    : shortId,
    channelLongId     : longId,
  };
};

const mapDispatchToProps = {
  checkForLoggedInChannel,
  logOutChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
