import { connect } from 'react-redux';
import View from './view';
import { selectAsset } from '../../selectors/show';

const mapStateToProps = (props) => {
  const { claimData: { title } } = selectAsset(props.show);
  return {
    title,
  };
};

export default connect(mapStateToProps, null)(View);
