import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ site }) => {
  return {
    siteDescription: site.description,
  };
};

export default connect(mapStateToProps, null)(View);
