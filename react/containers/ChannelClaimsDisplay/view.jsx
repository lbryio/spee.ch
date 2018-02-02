import React from 'react';
import AssetPreview from 'components/AssetPreview/index';
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
    this.getAndStoreChannelClaims(this.props.name, this.props.id, this.state.page);
  }
  getAndStoreChannelClaims (name, id, page) {
    if (!id) id = 'none';
    const url = `/api/channel-claims/${name}/${id}/${page}`;
    const that = this;
    return request(url)
      .then(({ success, message, data }) => {
        console.log('api/channel-claims response:', data);
        if (!success) {
          return that.setState({error: message});
        }
        this.props.onClaimsDataChange(data.claims, data.currentPage, data.totalPages, data.totalResults);
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
            {this.props.claims &&
            <div>
              {this.props.claims.map((claim, index) => <AssetPreview
                name={claim.name}
                claimId={claim.claimId}
                contentType={claim.contentType}
                key={index}
              />)}
              <p>current page: {this.props.currentPage}</p>
              <p>total pages: {this.props.totalPages}</p>
              <p>total claims: {this.props.totalClaims}</p>
            </div>
            }
          </div>
        )}
      </div>
    );
  }
};

export default ChannelClaimsDisplay;
