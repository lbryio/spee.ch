import React from 'react';
import GoogleAnalytics from 'react-ga';
import { withRouter } from 'react-router-dom';

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
    // initiate analytics
    const { googleAnalyticsId } = this.props;
    if (googleAnalyticsId) {
      GoogleAnalytics.initialize(googleAnalyticsId);
    }
    // return children
    return this.props.children;
  }
}

export default withRouter(GAListener);
