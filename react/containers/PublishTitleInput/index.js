import {connect} from 'react-redux';
import {updateMetadata} from 'actions';
import View from './view';

const mapStateToProps = state => {
  return {
    title: state.metadata.title,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMetadataChange: (name, value) => {
      dispatch(updateMetadata(name, value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
