import { connect } from 'react-redux';
import { updateThumbnailClaim, updateThumbnailFileOptions, updateThumbnailSelectedFile } from 'actions/publish';
import View from './view';

const mapStateToProps = ({ publish, site }) => {
  return {
    host          : site.host,
    // file props
    publishFile   : publish.file,
    publishClaim  : publish.claim,
    // channel props
    channel       : publish.thumbnail.channel,
    claim         : publish.thumbnail.claim,
    url           : publish.thumbnail.url,
    potentialFiles: publish.thumbnail.potentialFiles,
    selectedFile  : publish.thumbnail.selectedFile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onThumbnailClaimChange: (claim, url) => {
      dispatch(updateThumbnailClaim(claim, url));
    },
    onThumbnailFileOptionsChange: (fileOne, fileTwo, fileThree) => {
      dispatch(updateThumbnailFileOptions(fileOne, fileTwo, fileThree));
    },
    onThumbnailFileSelect: (file) => {
      dispatch(updateThumbnailSelectedFile(file));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
