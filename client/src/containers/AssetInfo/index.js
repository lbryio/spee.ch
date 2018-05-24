import { connect } from 'react-redux';
import View from './view';
import { selectAsset } from '../../selectors/show';

const mapStateToProps = ({ show }) => {
  // select asset
  const asset = selectAsset(show);
  //  return props
  return {
    asset,
  };
};

export default connect(mapStateToProps, null)(View);
