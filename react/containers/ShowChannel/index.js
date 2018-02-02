import { connect } from 'react-redux';
import { updateChannelData } from 'actions/show';
import View from './view';

const mapStateToProps = ({ show }) => {
  return {
    request: {
      name: show.channelRequest.name,
      id  : show.channelRequest.id,
    },
    channel: {
      name   : show.channelData.name,
      shortId: show.channelData.shortId,
      longId : show.channelData.longId,
    },
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChannelDataChange: (name, longId, shortId) => {
      dispatch(updateChannelData(name, longId, shortId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
