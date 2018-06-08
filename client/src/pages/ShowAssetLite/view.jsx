import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '@containers/SEO';
import AssetDisplay from '@containers/AssetDisplay';

class ShowLite extends React.Component {
  render () {
    const { asset } = this.props;
    if (asset) {
      const { name, claimId } = asset.claimData;
      return (
        <div className='row--tall flex-container--column flex-container--center-center show-lite-container'>
          <SEO pageTitle={name} asset={asset} />
          <AssetDisplay />
          <p className='extra-small'>
            <Link id='asset-boilerpate' className='link--primary' to={`/${claimId}/${name}`}> hosted on spee.ch</Link> via the <a  className='link--primary' href={'https://lbry.io/get'} target={'_blank'}>LBRY</a> blockchain
          </p>
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
