import React from 'react';

import SEO from '@containers/SEO';
import NavBar from '@components/NavBar';
import PageContent from '@components/PageContent';

class PageLayout extends React.Component {
  shouldComponentUpdate () {
    return false;
  }
  render () {
    return (
      <div className={'page-layout'}>
        <SEO pageTitle={this.props.pageTitle} pageUri={this.props.pageUri} />
        <NavBar />
        <PageContent>
          {this.props.children}
        </PageContent>
      </div>
    );
  }
}

export default PageLayout;
