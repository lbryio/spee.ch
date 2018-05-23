import { connect } from 'react-redux';
import { onNewThumbnail } from '../../actions/publish';
import View from './view';

const mapStateToProps = ({ publish: { file } }) => {
  return {
    file,
  };
};

const mapDispatchToProps = {
  onNewThumbnail,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
