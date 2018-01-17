import {updateClaim, updateError} from 'actions';
import {connect} from 'react-redux';
import View from './view';

const mapStateToProps = state => {
  return {
    fileName              : state.file.name,
    loggedInChannelName   : state.loggedInChannel.name,
    loggedInChannelShortId: state.loggedInChannel.shortId,
    publishInChannel      : state.publishInChannel,
    claim                 : state.claim,
    urlError              : state.error.url,
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
