import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import { createPageTitle } from 'utils/pageTitle';
import { createMetaTags } from 'utils/metaTags';
import { createCanonicalLink } from 'utils/canonicalLink';

class SEO extends React.Component {
  render () {
    let { pageTitle, asset, channel, pageUri } = this.props;
    pageTitle = createPageTitle(pageTitle);
    const metaTags = createMetaTags(asset, channel);
    const canonicalLink = createCanonicalLink(asset, channel, pageUri);
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
