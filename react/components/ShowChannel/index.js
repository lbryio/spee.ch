import React from 'react';
import NavBar from 'containers/NavBar';
import ChannelClaimsDisplay from 'components/ChannelClaimsDisplay';
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
    const channelName = this.props.channelName;
    const channelClaimId = this.props.channelClaimId || 'none';
    this.getAndStoreChannelData(channelName, channelClaimId);
  }
  getAndStoreChannelData (channelName, channelClaimId) {
    const url = `/api/channel-data/${channelName}/${channelClaimId}`;
    const that = this;
    return request(url)
      .then(({ success, message, data }) => {
        console.log('api/channel-data response:', data);
        if (!success) {
          return that.setState({error: message});
        }
        that.setState({
          channelName        : data.channelName,
          longChannelClaimId : data.longChannelClaimId,
          shortChannelClaimId: data.shortChannelClaimId,
        });
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
              <h2>channel name: {this.props.channelName}</h2>
              <p>full channel id: {this.state.longChannelClaimId ? this.state.longChannelClaimId : 'loading...'}</p>
              <p>short channel id: {this.state.shortChannelClaimId ? this.state.shortChannelClaimId : 'loading...'}</p>
            </div>
            <div className="column column--10">
              { (this.state.channelName && this.state.longChannelClaimId) &&
                <ChannelClaimsDisplay
                  channelName={this.state.channelName}
                  channelClaimId={this.state.longChannelClaimId}
                />
              }
            </div>
          </div>
        )}
      </div>
    );
  }
};

// required props
// channelName
// channelClaimId


export default ShowChannel;
