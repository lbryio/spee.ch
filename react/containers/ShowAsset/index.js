import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    modifier : show.assetRequest.modifier,
    claim    : show.assetRequest.name,
    extension: show.assetRequest.extension,
  };
};

export default connect(mapStateToProps, null)(View);
