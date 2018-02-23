import React from 'react';
import SEO from 'components/SEO';
import NavBar from 'containers/NavBar';
import ErrorPage from 'components/ErrorPage';
import AssetTitle from 'components/AssetTitle';
import AssetDisplay from 'components/AssetDisplay';
import AssetInfo from 'components/AssetInfo';
import { createPageTitle } from 'utils/pageTitle';
import { createAssetCanonicalLink } from 'utils/canonicalLink';
import { createAssetMetaTags } from 'utils/metaTags';

class ShowAssetDetails extends React.Component {
  render () {
    const { asset } = this.props;
    if (asset) {
      const { name } = asset.claimData;
      const pageTitle = createPageTitle(`${name} - details`);
      const canonicalLink = createAssetCanonicalLink(asset);
      const metaTags = createAssetMetaTags(asset);
      return (
        <div>
          <SEO pageTitle={pageTitle} canonicalLink={canonicalLink} metaTags={metaTags} />
          <NavBar />
          <div className='row row--tall row--padded'>
            <div className='column column--10'>
              <AssetTitle />
            </div>
            <div className='column column--5 column--sml-10 align-content-top'>
              <div className='row row--padded'>
                <AssetDisplay />
              </div>
            </div><div className='column column--5 column--sml-10 align-content-top'>
              <div className='row row--padded'>
                <AssetInfo />
              </div>
            </div>
          </div>
          }
        </div>
      );
    };
    return (
      <ErrorPage error={'loading asset data...'} />
    );
  }
};

export default ShowAssetDetails;
