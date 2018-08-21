import { connect } from 'react-redux';
import { clearFile, startPublish, abandonClaim } from '../../actions/publish';
import View from './view';

const mapStateToProps = ({ show, publish }) => {
  // select request info
  const requestId = show.request.id;
  // select asset info
  let asset;
  const request = show.requestList[requestId] || null;
  const assetList = show.assetList;
  if (request && assetList) {
    const assetKey = request.key;  // note: just store this in the request
    asset = assetList[assetKey] || null;
  };
  return {
    file    : publish.file,
    isUpdate: publish.isUpdate,
    asset,
  };
};

const mapDispatchToProps = {
  clearFile,
  startPublish,
  abandonClaim,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
