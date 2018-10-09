import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ site: { closedRegistration } }) => {
  return {
    closedRegistration,
  };
};

export default connect(mapStateToProps, null)(View);
