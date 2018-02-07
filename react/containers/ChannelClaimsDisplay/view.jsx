import React from 'react/index';
import AssetPreview from 'components/AssetPreview/index';
import request from 'utils/request';

class ChannelClaimsDisplay extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  componentDidMount () {
    const name = this.props.name;
    const longId = this.props.longId;
    this.updateClaimsData(name, longId, 1);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.name !== this.props.name || nextProps.longId !== this.props.longId) {
      this.updateClaimsData(nextProps.name, nextProps.longId, 1);
    }
  }
  updateClaimsData (name, longId, page) {
    const url = `/api/channel/claims/${name}/${longId}/${page}`;
    return request(url)
      .then(({ success, message, data }) => {
        console.log('api/channel-claims response:', data);
        if (!success) {
          return this.setState({error: message});
        }
        this.setState({error: null}); // move this error to redux state
        this.props.onChannelClaimsDataUpdate(data.claims, data.currentPage, data.totalPages, data.totalResults);
      })
      .catch((error) => {
        this.setState({error: error.message});
      });
  }
  componentWillUnmount () {
    this.props.onChannelClaimsDataClear();
  }
  showPreviousResultsPage () {
    const previousPage = parseInt(this.props.currentPage) - 1;
    this.updateClaimsData(this.props.name, this.props.longId, previousPage);
  }
  showNextResultsPage () {
    const nextPage = parseInt(this.props.currentPage) + 1;
    this.updateClaimsData(this.props.name, this.props.longId, nextPage);
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
                fileExt={claim.fileExt}
                contentType={claim.contentType}
                key={`${claim.name}-${index}`}
              />)}
              <div>
                {(this.props.currentPage > 1) && <button onClick={this.showPreviousResultsPage}>Previous Page</button>}
                {(this.props.currentPage < this.props.totalPages) && <button onClick={this.showNextResultsPage}>Next Page</button>}
              </div>
            </div>
            }
          </div>
        )}
      </div>
    );
  }
};

export default ChannelClaimsDisplay;
