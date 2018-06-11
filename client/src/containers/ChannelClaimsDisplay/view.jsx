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
    const groupedClaimsList = createGroupedList(claims, 4);
    if (claims.length > 0) {
      return (
        <div>
          <Row>
            {groupedClaimsList.map((group, index) => <HorizontalQuadSplit
              itemA={
                group[0] ? (
                  <AssetPreview
                    defaultThumbnail={defaultThumbnail}
                    claimData={group[0]}
                    key={`${group[0].name}-${index}`}
                  />
                ) : null
              }
              itemB={
                group[1] ? (
                  <AssetPreview
                    defaultThumbnail={defaultThumbnail}
                    claimData={group[1]}
                    key={`${group[1].name}-${index}`}
                  />
                ) : null
              }
              itemC={
                group[2] ? (
                  <AssetPreview
                    defaultThumbnail={defaultThumbnail}
                    claimData={group[2]}
                    key={`${group[2].name}-${index}`}
                  />
                ) : null
              }
              itemD={
                group[3] ? (
                  <AssetPreview
                    defaultThumbnail={defaultThumbnail}
                    claimData={group[3]}
                    key={`${group[3].name}-${index}`}
                  />
                ) : null
              }
            />)}
          </Row>
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
