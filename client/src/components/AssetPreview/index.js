import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({site: { defaultThumbnail }}) => {
  return {
    defaultThumbnail,
  };
};

export default connect(mapStateToProps, null)(View);
