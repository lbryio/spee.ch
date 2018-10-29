import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import siteConfig from '@config/siteConfig.json';
import createPageTitle from '../../utils/createPageTitle';
import createMetaTags from '../../utils/createMetaTags';
import oEmbed from '../../utils/oEmbed.js';
import createCanonicalLink from '../../utils/createCanonicalLink';

const { details: { host } } = siteConfig;

class SEO extends React.Component {
  render () {
    // props from parent
    const { asset, channel, pageUri } = this.props;
    let { pageTitle } = this.props;
    // create page title, tags, and canonical link
    pageTitle = createPageTitle(pageTitle);
    const metaTags = createMetaTags({
      asset,
      channel,
    });
    const canonicalLink = createCanonicalLink(asset, channel, pageUri);
    // render results
    return (
      <Helmet
        title={pageTitle}
        meta={metaTags}
        link={[
          {
            rel : 'canonical',
            href: canonicalLink,
          },
          oEmbed.json(host, canonicalLink),
        ]}
      />
    );
  }
}

SEO.propTypes = {
  pageTitle: PropTypes.string,
  pageUri  : PropTypes.string,
  channel  : PropTypes.object,
  asset    : PropTypes.object,
};

export default SEO;
