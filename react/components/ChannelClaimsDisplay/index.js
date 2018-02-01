import React from 'react';
import NavBar from 'containers/NavBar';
import AssetPreview from 'components/AssetPreview';
import request from 'utils/request';

class ChannelClaimsDisplay extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
      page : 1,
    };
    this.getAndStoreChannelClaims = this.getAndStoreChannelClaims.bind(this);
  }
  componentDidMount () {
    const channelName = this.props.channelName;
    const channelClaimId = this.props.channelClaimId || 'none';
    const page = this.state.page;
    this.getAndStoreChannelClaims(channelName, channelClaimId, page);
  }
  getAndStoreChannelClaims (channelName, channelClaimId, page) {
    const url = `/api/channel-claims/${channelName}/${channelClaimId}/${page}`;
    const that = this;
    return request(url)
      .then(({ success, message, data }) => {
        console.log('api/channel-claims response:', data);
        if (!success) {
          return that.setState({error: message});
        }
        that.setState({
          claims      : data.claims,
          currentPage : data.currentPage,
          nextPage    : data.nextPage,
          previousPage: data.previousPage,
          totalPages  : data.totalPages,
          totalResults: data.totalResults,
        });
      })
      .catch((error) => {
        that.setState({error: error.message});
      });
  }
  render () {
    return (
      <div>
        {this.state.error ? (
          <div className="row">
            <div className="column column--10">
              <p>{this.state.error}</p>
            </div>
          </div>
        ) : (
          <div className="row row--tall">
            <p># of claims in channel: {this.state.totalResults >= 0 ? this.state.totalResults : 'loading...' }</p>
            {this.state.claims && this.state.claims.map((claim, index) => <AssetPreview
              name={claim.name}
              claimId={claim.claimId}
              contentType={claim.contentType}
              key={index}
            />)}
          </div>
        )}
      </div>
    );
  }
};

// required props
// channelName
// channelClaimId

export default ChannelClaimsDisplay;
