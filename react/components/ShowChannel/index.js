import React from 'react';
import NavBar from 'containers/NavBar';
import AssetPreview from 'components/AssetPreview';
import request from 'utils/request';

class ShowChannel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error              : null,
      channelName        : null,
      claims             : null,
      currentPage        : null,
      longChannelClaimId : null,
      nextPage           : null,
      previousPage       : null,
      shortChannelClaimId: null,
      totalPages         : null,
      totalResults       : null,
    };
    this.updateChannelData = this.updateChannelData.bind(this);
  }
  componentDidMount () {
    console.log(this.props);
    this.updateChannelData(1);
  }
  updateChannelData (page) {
    const that = this;
    const channelName = this.props.channelName;
    const channelClaimId = this.props.channelClaimId || 'none';
    const url = `/api/channel-get-content/${channelName}/${channelClaimId}/${page}`;
    return request(url)
      .then(({ success, message, data }) => {
        console.log('get channel data response:', data);
        if (!success) {
          return this.setState({error: message});
        }
        that.setState({
          channelName        : data.channelName,
          claims             : data.claims,
          currentPage        : data.currentPage,
          longChannelClaimId : data.longChannelClaimId,
          nextPage           : data.nextPage,
          previousPage       : data.previousPage,
          shortChannelClaimId: data.shortChannelClaimId,
          totalPages         : data.totalPages,
          totalResults       : data.totalResults,
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
              <p># of claims in channel: {this.state.totalResults ? this.state.totalResults : 'loading...' }</p>
            </div>
            <div className="column column--10">
              <div>
                {/* claims here */}
                {this.state.claims && this.state.claims.map((claim, index) => <AssetPreview claim={claim} key={index} />)}
              </div>
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
