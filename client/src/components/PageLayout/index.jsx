import React from 'react';

import SEO from '@components/SEO';
import NavBar from '@containers/NavBar';
import PageContent from '@components/PageContent';

import style from './style.css.js';

class PageLayout extends React.Component {
  shouldComponentUpdate () {
    return false;
  }
  render () {
    return (
      <div style={style} className={'row--tall flex-container--column'}>
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
