import { connect } from 'react-redux';
import { setUpdateTrue, updateMetadata, clearFile } from '../../actions/publish';
import { onHandleShowPageUri } from '../../actions/show';
import { selectAsset } from '../../selectors/show';
import View from './view';

const mapStateToProps = (props) => {
  const { show } = props;
  return {
    asset    : selectAsset(show),
    myChannel: props.channel.loggedInChannel.name,
    isUpdate : props.publish.isUpdate,
  };
};

const mapDispatchToProps = {
  updateMetadata,
  onHandleShowPageUri,
  setUpdateTrue,
  clearFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
