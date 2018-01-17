import { connect } from 'react-redux';
import { selectFile, updateError } from 'actions';
import View from './view';

const mapStateToProps = state => {
  return {
    file     : state.file,
    thumbnail: state.metadata.thumbnail,
    fileError: state.error.file,
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
