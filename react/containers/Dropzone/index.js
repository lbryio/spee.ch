import { connect } from 'react-redux';
import { selectFile, updateError, clearFile } from 'actions/publish';
import View from './view';

const mapStateToProps = ({ publish }) => {
  return {
    file     : publish.file,
    thumbnail: publish.thumbnail.selectedFile,
    fileError: publish.error.file,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectFile: (file) => {
      dispatch(selectFile(file));
      dispatch(updateError('publishSubmit', null));
    },
    setFileError: (value) => {
      dispatch(clearFile());
      dispatch(updateError('file', value));
    },
    clearFileError: () => {
      dispatch(updateError('file', null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
