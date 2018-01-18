import {connect} from 'react-redux';
import {clearFile, selectFile, updateError, updatePublishStatus} from 'actions/publish';
import {updateLoggedInChannel} from 'actions/channel';
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
    fileError         : publish.error.file,
    urlError          : publish.error.url,
    publishSubmitError: publish.error.publishSubmit,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFileSelect: (file) => {
      dispatch(selectFile(file));
    },
    onFileClear: () => {
      dispatch(clearFile());
    },
    onChannelLogin: (name, shortId, longId) => {
      dispatch(updateLoggedInChannel(name, shortId, longId));
    },
    onPublishStatusChange: (status, message) => {
      dispatch(updatePublishStatus(status, message));
    },
    onPublishSubmitError: (value) => {
      dispatch(updateError('publishSubmit', value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
