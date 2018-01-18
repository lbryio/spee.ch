import {connect} from 'react-redux';
import {updateMetadata} from 'actions/publish';
import View from './view';

const mapStateToProps = ({ publish }) => {
  return {
    thumbnail: publish.metadata.thumbnail,
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
