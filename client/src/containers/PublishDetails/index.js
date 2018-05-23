import { connect } from 'react-redux';
import { clearFile, startPublish } from '../../actions/publish';
import View from './view';

const mapStateToProps = ({ channel, publish }) => {
  return {
    file: publish.file,
  };
};

const mapDispatchToProps = {
  clearFile,
  startPublish,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
