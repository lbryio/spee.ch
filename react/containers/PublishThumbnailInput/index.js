import {connect} from 'react-redux';
import {updateMetadata} from 'actions';
import View from './view';

const mapStateToProps = state => {
  return {
    thumbnail: state.metadata.thumbnail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onThumbnailChange: (name, value) => {
      dispatch(updateMetadata(name, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
