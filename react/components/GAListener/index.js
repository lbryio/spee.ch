import React from 'react';
import GoogleAnalytics from 'react-ga';
import { withRouter } from 'react-router-dom';
// const config = require('../../../../config/speechConfig.js');
const googleApiKey = 'UA-60403362-3'; // config.analytics.googleId;

GoogleAnalytics.initialize(googleApiKey);

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
