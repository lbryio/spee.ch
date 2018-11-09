import React from 'react';
import PageLayout from '@components/PageLayout';
import VerticalCollapsibleSplit from '@components/VerticalCollapsibleSplit';
import AssetDisplay from '@containers/AssetDisplay';
import ErrorPage from '@pages/ErrorPage';

/*

          <VerticalCollapsibleSplit
            name={'asset-display-collapse'}
            top={}
            bottom={<AssetInfo />}
          />

 */

class ShowAssetDetails extends React.Component {
  render () {
    const { asset } = this.props;
    if (asset) {
      const { claimData: { name } } = asset;
      return (
        <PageLayout
          pageTitle={`${name} - details`}
          asset={asset}
        >
          <AssetDisplay />

        </PageLayout>
      );
    }
    return (
      <ErrorPage error={'loading asset data...'} />
    );
  }
};

export default ShowAssetDetails;
