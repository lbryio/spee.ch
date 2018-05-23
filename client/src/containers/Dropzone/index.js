import { connect } from 'react-redux';
import { selectFile, updateError, clearFile } from '../../actions/publish';
import View from './view';

const mapStateToProps = ({ publish }) => {
  return {
    file     : publish.file,
    thumbnail: publish.thumbnail,
    fileError: publish.error.file,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectFile: (file) => {
      dispatch(selectFile(file));
    },
    setFileError: (value) => {
      dispatch(clearFile());
      dispatch(updateError('file', value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
