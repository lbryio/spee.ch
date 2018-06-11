import React from 'react';

import SEO from '@containers/SEO';

class PageLayoutShowLite extends React.Component {
  shouldComponentUpdate () {
    return false;
  }
  render () {
    return (
      <div className={'page-layout-show-lite'}>
        <SEO pageTitle={this.props.pageTitle} asset={this.props.asset} />
        <div className={'content'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PageLayoutShowLite;
