import { connect } from 'react-redux';
import { updateClaim, updateError, validateClaim } from '../../actions/publish';
import View from './view';

const mapStateToProps = ({ channel, publish }) => {
  return {
    loggedInChannelName   : channel.loggedInChannel.name,
    loggedInChannelShortId: channel.loggedInChannel.shortId,
    fileName              : publish.file.name,
    publishInChannel      : publish.publishInChannel,
    selectedChannel       : publish.selectedChannel,
    claim                 : publish.claim,
    urlError              : publish.error.url,
  };
};

const mapDispatchToProps = {
  validateClaim,
  updateClaim,
  updateError,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
