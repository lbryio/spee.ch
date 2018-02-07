import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    shortId      : show.showAsset.shortId,
    channelName  : show.showAsset.claimData.channelName,
    certificateId: show.showAsset.claimData.certificateId,
    description  : show.showAsset.claimData.description,
    name         : show.showAsset.claimData.name,
    claimId      : show.showAsset.claimData.claimId,
    fileExt      : show.showAsset.claimData.fileExt,
    contentType  : show.showAsset.claimData.contentType,
    thumbnail    : show.showAsset.claimData.thumbnail,
    host         : show.showAsset.claimData.host,
  };
};

export default connect(mapStateToProps, null)(View);
