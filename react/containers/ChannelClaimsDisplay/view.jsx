import React from 'react';
import AssetPreview from 'components/AssetPreview';

class ChannelClaimsDisplay extends React.Component {
  constructor (props) {
    super(props);
    this.showNextResultsPage = this.showNextResultsPage.bind(this);
    this.showPreviousResultsPage = this.showPreviousResultsPage.bind(this);
  }
  showNewPage (page) {
    console.log(`update claims data with new page ${page}`);
    this.props.onChannelPageUpdate(page);
  }
  showPreviousResultsPage () {
    const previousPage = parseInt(this.props.currentPage) - 1;
    this.showNewPage(previousPage);
  }
  showNextResultsPage () {
    const nextPage = parseInt(this.props.currentPage) + 1;
    this.showNewPage(nextPage);
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
