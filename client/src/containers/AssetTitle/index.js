import { connect } from 'react-redux';
import View from './view';
import { selectAsset } from '../../selectors/show';

const mapStateToProps = ({ show }) => {
  const { claimData: { title } } = selectAsset(show);
  return {
    title,
  };
};

export default connect(mapStateToProps, null)(View);
