import { connect } from 'react-redux';
import View from './view';
import { selectAsset } from '../../selectors/show';

const mapStateToProps = (props) => {
  const {show} = props;
  // select asset
  const asset = selectAsset(show);
  const editable = Boolean(props.channel.loggedInChannel.name === asset.claimData.channelName);
  //  return props
  return {
    asset,
    editable,
  };
};

export default connect(mapStateToProps, null)(View);
