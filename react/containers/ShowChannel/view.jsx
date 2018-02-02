import React from 'react';
import NavBar from 'containers/NavBar';
import ChannelClaimsDisplay from 'components/ChannelClaimsDisplay';
import request from 'utils/request';

class ShowChannel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error  : null,
      name   : null,
      shortId: null,
      longId : null,
    };
    this.getAndStoreChannelData = this.getAndStoreChannelData.bind(this);
  }
  componentDidMount () {
    this.getAndStoreChannelData(this.props.requestName, this.props.requestId);
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
        this.setState({
          name   : data.channelName,
          longId : data.longChannelClaimId,
          shortId: data.shortChannelClaimId,
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
              <h2>channel name: {this.state.name ? this.state.name : 'loading...'}</h2>
              <p>full channel id: {this.state.longId ? this.state.longId : 'loading...'}</p>
              <p>short channel id: {this.state.shortId ? this.state.shortId : 'loading...'}</p>
            </div>
            <div className="column column--10">
              {(this.state.name && this.state.longId) &&
              <ChannelClaimsDisplay
                name={this.state.name}
                longId={this.state.longId}
              />
              }
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default ShowChannel;
