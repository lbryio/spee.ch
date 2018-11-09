import {connect} from 'react-redux';
import {updateMetadata, toggleMetadataInputs} from '../../actions/publish';
import View from './view';

const mapStateToProps = ({ publish }) => {
  return {
    showMetadataInputs: publish.showMetadataInputs,
    description       : publish.metadata.description,
    license           : publish.metadata.license,
    nsfw              : publish.metadata.nsfw,
    isUpdate          : publish.isUpdate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMetadataChange: (name, value) => {
      dispatch(updateMetadata(name, value));
    },
    onToggleMetadataInputs: (value) => {
      dispatch(toggleMetadataInputs(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
