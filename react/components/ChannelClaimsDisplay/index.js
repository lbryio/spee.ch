import React from 'react';
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
    this.showPreviousResultsPage = this.showPreviousResultsPage.bind(this);
    this.showNextResultsPage = this.showNextResultsPage.bind(this);
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
  showPreviousResultsPage () {
    const previousPage = parseInt(this.state.currentPage) - 1;
    this.updateClaimsData(previousPage);
  }
  showNextResultsPage () {
    const nextPage = parseInt(this.state.currentPage) + 1;
    this.updateClaimsData(nextPage);
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
            {this.state.claims &&
            <div>
              {this.state.claims.map((claim, index) => <AssetPreview
                name={claim.name}
                claimId={claim.claimId}
                fileExt={claim.fileExt}
                contentType={claim.contentType}
                key={`${claim.name}-${index}`}
              />)}
              <div>
                {(this.state.currentPage > 1) && <button onClick={this.showPreviousResultsPage}>Previous Page</button>}
                {(this.state.currentPage < this.state.totalPages) && <button onClick={this.showNextResultsPage}>Next Page</button>}
              </div>
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
