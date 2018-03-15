import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ site: { host, title } }) => {
  return {
    host,
    title,
  };
};

export default connect(mapStateToProps, null)(View);
