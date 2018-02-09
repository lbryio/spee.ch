import React from 'react';
import AssetPreview from 'components/AssetPreview';

class ChannelClaimsDisplay extends React.Component {
  constructor (props) {
    super(props);
    this.showNextResultsPage = this.showNextResultsPage.bind(this);
    this.showPreviousResultsPage = this.showPreviousResultsPage.bind(this);
  }
  showPreviousResultsPage () {
    const { channel: { claimsData: { currentPage } } } = this.props;
    const previousPage = parseInt(currentPage) - 1;
    this.showNewPage(previousPage);
  }
  showNextResultsPage () {
    const { channel: { claimsData: { currentPage } } } = this.props;
    const nextPage = parseInt(currentPage) + 1;
    this.showNewPage(nextPage);
  }
  showNewPage (page) {
    const { showChannelId, channel: { channelData: { name, longId } } } = this.props;
    console.log(`update claims data on channel ${showChannelId} with new page ${page}`);
    this.props.onChannelPageUpdate(showChannelId, name, longId, page);
  }
  render () {
    const { channel: { error, claimsData: { claims, currentPage, totalPages } } } = this.props;
    return (
      <div>
        {error ? (
          <div className="row">
            <div className="column column--10">
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <div className="row row--tall">
            {claims &&
            <div>
              {claims.map((claim, index) => <AssetPreview
                name={claim.name}
                claimId={claim.claimId}
                fileExt={claim.fileExt}
                contentType={claim.contentType}
                key={`${claim.name}-${index}`}
              />)}
              <div>
                {(currentPage > 1) &&
                <button className={'button--secondary'} onClick={this.showPreviousResultsPage}>Previous Page</button>
                }
                {(currentPage < totalPages) &&
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
