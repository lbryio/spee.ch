import { connect } from 'react-redux';
import { selectAsset } from '../../selectors/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    asset: selectAsset(show),
  };
};

export default connect(mapStateToProps, null)(View);
