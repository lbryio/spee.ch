import React from 'react';

import SEO from '@containers/SEO';
import NavBar from '@components/NavBar';

class PageLayout extends React.Component {
  render () {
    return (
      <div className={'page-layout'}>
        <SEO pageTitle={this.props.pageTitle} pageUri={this.props.pageUri} />
        <NavBar />
        <div className={'content'}>
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default PageLayout;
