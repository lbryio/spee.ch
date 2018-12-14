import {connect} from 'react-redux';
import View from './view';
import {selectAsset} from '../../selectors/show';
import {createPermanentURI} from '@clientutils/createPermanentURI';

const mapStateToProps = props => {
  const { show, publish } = props;
  const asset = selectAsset(show);
  let uri;
  if (asset) {
    uri = `lbry://${createPermanentURI(asset)}`;
  }
  return {
    disabled  : publish.disabled,
    file      : publish.file,
    status    : publish.status.status,
    isUpdate  : publish.isUpdate,
    hasChanged: publish.hasChanged,
    uri,
  };
};

export default connect(mapStateToProps, null)(View);
