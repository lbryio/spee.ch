import {connect} from 'react-redux';
import {updateMetadata} from '../../actions/publish';
import View from './view';

const mapStateToProps = ({ publish }) => {
  return {
    title: publish.metadata.title,
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
