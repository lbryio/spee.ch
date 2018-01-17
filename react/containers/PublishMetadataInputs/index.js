import {connect} from 'react-redux';
import {updateMetadata} from '../../actions';
import View from './view.jsx';

const mapStateToProps = state => {
  return {
    description: state.metadata.description,
    license    : state.metadata.license,
    nsfw       : state.metadata.nsfw,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMetadataChange: (name, value) => {
      dispatch(updateMetadata(name, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
