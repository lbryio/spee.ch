import {connect} from 'react-redux';
import {clearFile, updateError, updatePublishStatus} from 'actions/publish';
import View from './view';

const mapStateToProps = ({ channel, publish }) => {
  return {
    loggedInChannel   : channel.loggedInChannel,
    file              : publish.file,
    claim             : publish.claim,
    title             : publish.metadata.title,
    thumbnail         : publish.metadata.thumbnail,
    description       : publish.metadata.description,
    license           : publish.metadata.license,
    nsfw              : publish.metadata.nsfw,
    publishInChannel  : publish.publishInChannel,
    selectedChannel   : publish.selectedChannel,
    fileError         : publish.error.file,
    urlError          : publish.error.url,
    publishSubmitError: publish.error.publishSubmit,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFileClear: () => {
      dispatch(clearFile());
    },
    onPublishStatusChange: (status, message) => {
      dispatch(updatePublishStatus(status, message));
    },
    onChannelSelectionError: (value) => {
      dispatch(updateError('channel', value));
    },
    onPublishSubmitError: (value) => {
      dispatch(updateError('publishSubmit', value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
