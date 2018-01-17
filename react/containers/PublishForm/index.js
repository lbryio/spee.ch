import {clearFile, selectFile, updateError, updateLoggedInChannel, updatePublishStatus} from '../../actions';
import {connect} from 'react-redux';
import View from './view.jsx';

const mapStateToProps = state => {
  return {
    file              : state.file,
    claim             : state.claim,
    title             : state.metadata.title,
    thumbnail         : state.metadata.thumbnail,
    description       : state.metadata.description,
    license           : state.metadata.license,
    nsfw              : state.metadata.nsfw,
    loggedInChannel   : state.loggedInChannel,
    publishInChannel  : state.publishInChannel,
    fileError         : state.error.file,
    urlError          : state.error.url,
    publishSubmitError: state.error.publishSubmit,
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
