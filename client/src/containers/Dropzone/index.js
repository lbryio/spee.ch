import { connect } from 'react-redux';
import { selectFile, updateError, clearFile } from '../../actions/publish';
import { selectAsset } from '../../selectors/show';
import View from './view';

const mapStateToProps = ({ show, publish: { file, thumbnail, fileError, isUpdate } }) => {
  const obj = { file, thumbnail, fileError, isUpdate };
  let asset, name, claimId, fileExt, outpoint, sourceUrl;
  if (isUpdate) {
    asset = selectAsset(show);
    if (asset) {
      ({name, claimData: {claimId, fileExt, outpoint}} = asset);
      sourceUrl = `/${claimId}/${name}.${fileExt}?${outpoint}`;
    }
    if (sourceUrl) {
      obj.sourceUrl = sourceUrl;
    }
  }
  return obj;
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
