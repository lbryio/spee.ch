import { connect } from 'react-redux';
import { selectAsset, selectDetailsExpanded } from '../../selectors/show';
import { toggleDetailsExpanded } from '../../actions/show';

import View from './view';

const mapStateToProps = state => {
  return {
    asset: selectAsset(state.show),
    detailsExpanded: selectDetailsExpanded(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleDetailsExpanded: value => {
      dispatch(toggleDetailsExpanded(value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
