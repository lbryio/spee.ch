import React from 'react/index';
import AssetPreview from 'components/AssetPreview';
import request from 'utils/request';

class ChannelClaimsDisplay extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error      : null,
      claims     : null,
      currentPage: null,
      totalPages : null,
      totalClaims: null,
    };
    this.updateClaimsData = this.updateClaimsData.bind(this);
  }
  componentDidMount () {
    this.updateClaimsData(1);
  }
  updateClaimsData (page) {
    const name = this.props.name;
    const longId = this.props.longId;
    const url = `/api/channel-claims/${name}/${longId}/${page}`;
    const that = this;
    return request(url)
      .then(({ success, message, data }) => {
        console.log('api/channel-claims response:', data);
        if (!success) {
          return that.setState({error: message});
        }
        this.setState({
          claims     : data.claims,
          currentPage: data.currentPage,
          totalPages : data.totalPages,
          totalClaims: data.totalResults,
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
            <p>total pages: {this.state.totalPages}</p>
            <p>total claims: {this.state.totalClaims}</p>
            {this.state.claims &&
            <div>
              {this.state.claims.map((claim, index) => <AssetPreview
                name={claim.name}
                claimId={claim.claimId}
                contentType={claim.contentType}
                key={index}
              />)}
              {(this.state.currentPage > 1) && <button onClick={this.updateClaimsData(this.state.currentPage - 1)}>Previous Page</button>}
              <p>current page: {this.state.currentPage}</p>
              {(this.state.currentPage < this.state.totalPages) && <button onClick={this.updateClaimsData(this.state.currentPage + 1)}>Next Page</button>}
            </div>
            }
          </div>
        )}
      </div>
    );
  }
};

// PropTypes
// name
// id

export default ChannelClaimsDisplay;
