import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

class SEO extends React.Component {
  render () {
    const { pageTitle, metaTags, canonicalLink } = this.props;
    return (
      <Helmet
        title={pageTitle}
        link={[{rel: 'canonical', href: canonicalLink}]}
        meta={metaTags}
      />
    );
  }
};

SEO.propTypes = {
  pageTitle    : PropTypes.string.isRequired,
  metaTags     : PropTypes.array.isRequired,
  canonicalLink: PropTypes.string.isRequired,
};

export default SEO;
