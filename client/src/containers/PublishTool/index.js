import {connect} from 'react-redux';
import View from './view';
import {selectAsset} from "../../selectors/show";
import {buildURI} from "../../utils/buildURI";

const mapStateToProps = props => {
  const { show, publish } = props;
  const asset = selectAsset(show);
  let uri;
  if (asset) {
    uri = `lbry://${buildURI(asset)}`;
  }
  return {
    disabled: publish.disabled,
    file    : publish.file,
    status  : publish.status.status,
    isUpdate: publish.isUpdate,
    uri,
  };
};

export default connect(mapStateToProps, null)(View);
