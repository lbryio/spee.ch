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
        <div className={'channel-claims-display'}>
          <div>
            {groupedClaimsList.map((group, index) => {
              const itemA = group[0];
              const itemB = group[1];
              const itemC = group[2];
              const itemD = group[3];
              return (
                <HorizontalQuadSplit
                  key={`claims-row-${index}`}
                  columnA={
                    itemA && (
                      <AssetPreview
                        defaultThumbnail={defaultThumbnail}
                        claimData={itemA}
                        key={`${itemA.name}-${itemA.id}`}
                      />
                    )
                  }
                  columnB={
                    itemB && (
                      <AssetPreview
                        defaultThumbnail={defaultThumbnail}
                        claimData={itemB}
                        key={`${itemB.name}-${itemB.id}`}
                      />
                    )
                  }
                  columnC={
                    itemC && (
                      <AssetPreview
                        defaultThumbnail={defaultThumbnail}
                        claimData={itemC}
                        key={`${itemC.name}-${itemC.id}`}
                      />
                    )
                  }
                  columnD={
                    itemD && (
                      <AssetPreview
                        defaultThumbnail={defaultThumbnail}
                        claimData={itemD}
                        key={`${itemD.name}-${itemD.id}`}
                      />
                    )
                  }
                />
              );
            })}
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
