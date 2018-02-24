import React from 'react';
import SEO from 'components/SEO';
import { Link } from 'react-router-dom';
import AssetDisplay from 'components/AssetDisplay';

class ShowLite extends React.Component {
  render () {
    const { asset } = this.props;
    if (asset) {
      const { name, claimId } = asset.claimData;
      return (
        <div className='row row--tall flex-container--column flex-container--center-center'>
          <SEO pageTitle={name} asset={asset} />
          <div>
            <AssetDisplay />
            <Link id='asset-boilerpate' className='link--primary fine-print' to={`/${claimId}/${name}`}>hosted
              via Spee.ch</Link>
          </div>
        </div>
      );
    }
    return (
      <p>loading asset data...</p>
    );
  }
};

export default ShowLite;
