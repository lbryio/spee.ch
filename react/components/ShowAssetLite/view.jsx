import React from 'react';
import SEO from 'components/SEO';
import { Link } from 'react-router-dom';
import AssetDisplay from 'components/AssetDisplay';
import { createPageTitle } from 'utils/pageTitle';
import { createAssetCanonicalLink } from 'utils/canonicalLink';
import { createAssetMetaTags } from 'utils/metaTags';

class ShowLite extends React.Component {
  render () {
    const { asset } = this.props;
    if (asset) {
      const { name, claimId } = asset.claimData;
      const pageTitle = createPageTitle(name);
      const canonicalLink = createAssetCanonicalLink(asset);
      const metaTags = createAssetMetaTags(asset);
      return (
        <div className='row row--tall flex-container--column flex-container--center-center'>
          <SEO pageTitle={pageTitle} canonicalLink={canonicalLink} metaTags={metaTags} />
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
