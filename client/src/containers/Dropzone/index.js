import { connect } from 'react-redux';
import { selectFile, updateError, clearFile } from '../../actions/publish';
import { selectAsset } from '../../selectors/show';
import View from './view';

const mapStateToProps = ({ publish, show }) => {
  const asset = selectAsset(show);
  const { name, claimData: { claimId, fileExt, outpoint } } = asset;
  const sourceUrl = `/${claimId}/${name}.${fileExt}?${outpoint}`;
  return {
    file     : publish.file,
    thumbnail: publish.thumbnail,
    fileError: publish.error.file,
    isUpdate : publish.isUpdate,
    sourceUrl,
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
