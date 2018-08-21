import { connect } from 'react-redux';
import View from './view';
import { selectAsset } from '../../selectors/show';

const mapStateToProps = (props) => {
  const { claimData: { title, claimId, name, channelName } } = selectAsset(props.show);
  const editable = Boolean(props.channel.loggedInChannel.name === channelName);
  return {
    title,
    claimId,
    name,
    editable,
  };
};

export default connect(mapStateToProps, null)(View);
