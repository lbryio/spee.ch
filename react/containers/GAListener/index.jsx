import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ site: { googleAnalyticsId } }) => {
  return {
    googleAnalyticsId,
  };
};

export default connect(mapStateToProps, null)(View);
