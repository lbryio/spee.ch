import { connect } from 'react-redux';
import View from './view';
import {updateChannelData} from 'actions/show';

const mapStateToProps = ({ show }) => {
  return {
    request: {
      name: show.request.channel.name,
      id  : show.request.channel.id,
    },
    channel: {
      name   : show.channel.name,
      shortId: show.channel.shortId,
      longId : show.channel.longId,
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
