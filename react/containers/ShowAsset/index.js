import { updateClaimData } from 'actions/show';
import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    request: {
      modifier : show.request.claim.modifier,
      claim    : show.request.claim.name,
      extension: show.request.claim.extension,
    },
    claim: show.claim,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClaimDataChange: (data) => {
      dispatch(updateClaimData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
