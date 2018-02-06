import { connect } from 'react-redux';
import { selectFile, updateError } from 'actions/publish';
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
    onFileSelect: (file) => {
      dispatch(selectFile(file));
      dispatch(updateError('publishSubmit', null));
    },
    onFileError: (value) => {
      dispatch(updateError('file', value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
