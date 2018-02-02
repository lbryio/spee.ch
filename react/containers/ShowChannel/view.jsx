import React from 'react';
import NavBar from 'containers/NavBar';
import ChannelClaimsDisplay from 'containers/ChannelClaimsDisplay';
import request from 'utils/request';

class ShowChannel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
    };
    this.getAndStoreChannelData = this.getAndStoreChannelData.bind(this);
  }
  componentDidMount () {
    this.getAndStoreChannelData(this.props.request.name, this.props.request.id);
  }
  getAndStoreChannelData (name, id) {
    if (!id) id = 'none';
    const url = `/api/channel-data/${name}/${id}`;
    const that = this;
    return request(url)
      .then(({ success, message, data }) => {
        console.log('api/channel-data response:', data);
        if (!success) {
          return that.setState({error: message});
        }
        this.props.onChannelDataChange(data.channelName, data.longChannelClaimId, data.shortChannelClaimId);
      })
      .catch((error) => {
        that.setState({error: error.message});
      });
  }
  render () {
    return (
      <div>
        <NavBar/>
        {this.state.error ? (
          <div className="row row--tall row--padded">
            <div className="column column--10">
              <p>{this.state.error}</p>
            </div>
          </div>
        ) : (
          <div className="row row--tall row--padded">
            <div className="column column--10">
              <h2>channel name: {this.props.channel.name}</h2>
              <p>full channel id: {this.props.channel.longId ? this.props.channel.longId : 'loading...'}</p>
              <p>short channel id: {this.props.channel.shortId ? this.props.channel.shortId : 'loading...'}</p>
            </div>
            <div className="column column--10">
              {this.props.channel.name && <ChannelClaimsDisplay/>}
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default ShowChannel;
