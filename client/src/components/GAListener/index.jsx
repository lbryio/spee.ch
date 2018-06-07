import React from 'react';
import GoogleAnalytics from 'react-ga';
import { withRouter } from 'react-router-dom';

import siteConfig from '@config/siteConfig.json';

let googleId = null;

if (!siteConfig) {
  console.log('WARNING: no site config found for GAListener');
}

if (!siteConfig.analytics) {
  console.log('WARNING: no analytics configs found in siteConfig.json');
}

if (siteConfig && siteConfig.analytics) {
  ({ googleId } = siteConfig.analytics);
}

if (googleId) {
  GoogleAnalytics.initialize(googleId);
}

class GAListener extends React.Component {
  componentDidMount () {
    this.sendPageView(this.props.history.location);
    this.props.history.listen(this.sendPageView);
  }

  sendPageView (location) {
    if (googleId) {
      GoogleAnalytics.set({ page: location.pathname });
      GoogleAnalytics.pageview(location.pathname);
    }
  }

  render () {
    return this.props.children;
  }
}

export default withRouter(GAListener);
