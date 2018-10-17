import { connect } from 'react-redux';
import { selectFile, updateError, clearFile } from '../../actions/publish';
import { selectAsset } from '../../selectors/show';
import View from './view';
import siteConfig from '@config/siteConfig.json';

const { assetDefaults: { thumbnail: defaultThumbnail } } = siteConfig;

const mapStateToProps = ({ show, publish: { file, thumbnail, fileError, isUpdate } }) => {
  const obj = { file, thumbnail, fileError, isUpdate };
  let asset, name, claimId, fileExt, outpoint, sourceUrl;
  if (isUpdate) {
    asset = selectAsset(show);
    if (asset) {
      if (asset.claimData.fileExt === 'mp4') {
        obj.sourceUrl = asset.claimData.thumbnail ? asset.claimData.thumbnail : defaultThumbnail;
      } else {
        ({name, claimData: {claimId, fileExt, outpoint}} = asset);
        obj.sourceUrl = `/${claimId}/${name}.${fileExt}?${outpoint}`;
      }
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
