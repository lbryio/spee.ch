import {updateClaim, updateError} from 'actions/publish';
import {connect} from 'react-redux';
import View from './view';

const mapStateToProps = ({ channel, publish }) => {
  return {
    loggedInChannelName   : channel.loggedInChannel.name,
    loggedInChannelShortId: channel.loggedInChannel.shortId,
    fileName              : publish.file.name,
    publishInChannel      : publish.publishInChannel,
    claim                 : publish.claim,
    urlError              : publish.error.url,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClaimChange: (value) => {
      dispatch(updateClaim(value));
      dispatch(updateError('publishSubmit', null));
    },
    onUrlError: (value) => {
      dispatch(updateError('url', value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
