import { connect } from 'react-redux';
import View from './view';
import selectAsset from 'selectors/asset';

const mapStateToProps = ({ show }) => {
  // select title
  const { claimData: { title } } = selectAsset(show);
  //  return props
  return {
    title,
  };
};

export default connect(mapStateToProps, null)(View);
