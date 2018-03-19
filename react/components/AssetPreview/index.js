import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({site: {defaults: { defaultThumbnail }}}) => {
  return {
    defaultThumbnail,
  };
};

export default connect(mapStateToProps, null)(View);
