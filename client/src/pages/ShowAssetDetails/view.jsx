import React from 'react';
import SEO from '@components/SEO';
import NavBar from '../../containers/NavBar/index';
import ErrorPage from '../ErrorPage/index';
import AssetTitle from '../../containers/AssetTitle/index';
import AssetDisplay from '../../containers/AssetDisplay/index';
import AssetInfo from '../../containers/AssetInfo/index';

class ShowAssetDetails extends React.Component {
  render () {
    const { asset } = this.props;
    if (asset) {
      const { claimData: { name } } = asset;
      return (
        <div>
          <SEO pageTitle={`${name} - details`} asset={asset} />
          <NavBar />
          <div className='row row--tall row--padded'>
            <div className='column column--10'>
              <AssetTitle />
            </div>
            <div className='column column--5 column--sml-10 align-content-top'>
              <div className='row row--padded show-details-container'>
                <AssetDisplay />
              </div>
            </div><div className='column column--5 column--sml-10 align-content-top'>
              <div className='row row--padded'>
                <AssetInfo />
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <ErrorPage error={'loading asset data...'} />
    );
  }
};

export default ShowAssetDetails;
