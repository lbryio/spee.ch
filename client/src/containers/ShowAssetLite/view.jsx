import React from 'react';
import { Link } from 'react-router-dom';
// components
import SEO from '@components/SEO';
// containers
import AssetDisplay from '../AssetDisplay';

class ShowLite extends React.Component {
  render () {
    const { asset } = this.props;
    if (asset) {
      const { name, claimId } = asset.claimData;
      return (
        <div className='row row--tall flex-container--column flex-container--center-center show-lite-container'>
          <SEO pageTitle={name} asset={asset} />
          <AssetDisplay />
          <Link id='asset-boilerpate' className='link--primary fine-print' to={`/${claimId}/${name}`}>hosted
            via Spee.ch</Link>
        </div>
      );
    }
    return (
      <div className='row row--tall row--padded flex-container--column flex-container--center-center'>
        <p>loading asset data...</p>
      </div>
    );
  }
};

export default ShowLite;
