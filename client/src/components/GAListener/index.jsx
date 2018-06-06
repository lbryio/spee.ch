import React from 'react';
import GoogleAnalytics from 'react-ga';
import { withRouter } from 'react-router-dom';

import siteConfig from '@config/siteConfig.json';

let googleId = null;

if (!siteConfig) {
  console.log('no site config found for GAListener');
}

if (siteConfig.analytics) {
  ({ googleId } = siteConfig.analytics);
}

GoogleAnalytics.initialize(googleId);

class GAListener extends React.Component {
  componentDidMount () {
    this.sendPageView(this.props.history.location);
    this.props.history.listen(this.sendPageView);
  }

  sendPageView (location) {
    GoogleAnalytics.set({ page: location.pathname });
    GoogleAnalytics.pageview(location.pathname);
  }

  render () {
    return this.props.children;
  }
}

export default withRouter(GAListener);
