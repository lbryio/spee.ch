import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import { createPageTitle } from '../../utils/pageTitle';
import { createMetaTags } from '../../utils/metaTags';
import { createCanonicalLink } from '../../utils/canonicalLink';

class SEO extends React.Component {
  render () {
    // props from state
    const { defaultDescription, defaultThumbnail, siteDescription, siteHost, siteTitle, siteTwitter } = this.props;
    // props from parent
    const { asset, channel, pageUri } = this.props;
    let { pageTitle } = this.props;
    // create page title, tags, and canonical link
    pageTitle = createPageTitle(siteTitle, pageTitle);
    const metaTags = createMetaTags(siteDescription, siteHost, siteTitle, siteTwitter, asset, channel, defaultDescription, defaultThumbnail);
    const canonicalLink = createCanonicalLink(asset, channel, pageUri, siteHost);
    // render results
    return (
      <Helmet
        title={pageTitle}
        meta={metaTags}
        link={[{rel: 'canonical', href: canonicalLink}]}
      />
    );
  }
};

SEO.propTypes = {
  pageTitle: PropTypes.string,
  pageUri  : PropTypes.string,
  channel  : PropTypes.object,
  asset    : PropTypes.object,
};

export default SEO;
