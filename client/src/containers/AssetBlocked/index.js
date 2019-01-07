import { connect } from 'react-redux';
import View from './view';
import { selectAsset } from '../../selectors/show';

const mapStateToProps = (props) => {
  const {show} = props;
  const asset = selectAsset(show);
  return {
    asset,
  };
};

export default connect(mapStateToProps, null)(View);
