import { connect } from 'react-redux';
import { updateThumbnailClaim, updateThumbnailSelectedFile } from 'actions/publish';
import View from './view';

const mapStateToProps = ({ publish, site }) => {
  return {
    host            : site.host,
    // file props
    file            : publish.file,
    claim           : publish.claim,
    // channel props
    thumbnailChannel: publish.thumbnail.channel,
    thumbnailClaim  : publish.thumbnail.claim,
    thumbnailFile   : publish.thumbnail.selectedFile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onThumbnailChange: (claim, url) => {
      dispatch(updateThumbnailClaim(claim, url));
    },
    onThumbnailFileSelect: (file) => {
      dispatch(updateThumbnailSelectedFile(file));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
