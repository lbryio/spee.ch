import React from 'react';
import AssetPreview from 'components/AssetPreview';
import request from 'utils/request';

class ChannelClaimsDisplay extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
    };
    this.showNextResultsPage = this.showNextResultsPage.bind(this);
    this.showPreviousResultsPage = this.showPreviousResultsPage.bind(this);
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
    console.log('this function has been moved into the redux sagas');
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
                {(this.props.currentPage > 1) &&
                <button className={'button--secondary'} onClick={this.showPreviousResultsPage}>Previous Page</button>
                }
                {(this.props.currentPage < this.props.totalPages) &&
                <button className={'button--secondary'} onClick={this.showNextResultsPage}>Next Page</button>
                }
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
