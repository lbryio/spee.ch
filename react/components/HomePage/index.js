import React from 'react';
import SEO from 'components/SEO';
import NavBar from 'containers/NavBar';
import PublishTool from 'containers/PublishTool';
import { createPageTitle } from 'utils/pageTitle';
import { createBasicCanonicalLink } from 'utils/canonicalLink';
import { createBasicMetaTags } from 'utils/metaTags';

class HomePage extends React.Component {
  render () {
    const pageTitle = createPageTitle();
    const canonicalLink = createBasicCanonicalLink();
    const metaTags = createBasicMetaTags();
    return (
      <div className={'row row--tall flex-container--column'}>
        <SEO pageTitle={pageTitle} canonicalLink={canonicalLink} metaTags={metaTags} />
        <NavBar />
        <div className={'row row--tall row--padded flex-container--column'}>
          <PublishTool />
        </div>
      </div>
    );
  }
};

export default HomePage;
