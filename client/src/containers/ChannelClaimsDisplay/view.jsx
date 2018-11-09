import React from 'react';
import AssetPreview from '@components/AssetPreview';
import HorizontalQuadSplit from '@components/HorizontalQuadSplit';
import Row from '@components/Row';
import ButtonSecondary from '@components/ButtonSecondary';
import { createGroupedList } from '../../utils/createGroupedList.js';

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
    const { channelKey, channel: { name, longId } } = this.props;
    this.props.onUpdateChannelClaims(channelKey, name, longId, page);
  }
  render () {
    const {channel: {claimsData: {claims, currentPage, totalPages}}, defaultThumbnail} = this.props;
    if (claims.length > 0) {
      return (
        <div>
          <div>
            <div className={'channel-claims-display'}>
              {claims.map(claim => (
                <AssetPreview
                  defaultThumbnail={defaultThumbnail}
                  claimData={claim}
                  key={claim.claimId}
                />
              ))}
            </div>
          </div>
          <Row>
            {(currentPage > 1) &&
            <ButtonSecondary
              value={'Previous Page'}
              onClickHandler={this.showPreviousResultsPage}
            />
            }
            {(currentPage < totalPages) &&
            <ButtonSecondary
              value={'Next Page'}
              onClickHandler={this.showNextResultsPage}
            />
            }
          </Row>
        </div>
      );
    } else {
      return (
        <p>There are no claims in this channel</p>
      );
    }
  }
}

export default ChannelClaimsDisplay;
