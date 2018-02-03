import { connect } from 'react-redux';
import {updateChannelData} from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    requestName: show.channelRequest.name,
    requestId  : show.channelRequest.id,
    name       : show.showChannel.channelData.name,
    shortId    : show.showChannel.channelData.shortId,
    longId     : show.showChannel.channelData.longId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChannelDataUpdate: (name, longId, shortId) => {
      dispatch(updateChannelData(name, longId, shortId));
    },
    onChannelDataClear: () => {
      dispatch(updateChannelData(null, null, null));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
