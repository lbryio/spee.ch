import React from 'react';
import GoogleAnalytics from 'react-ga';
const config = require('../../config/speechConfig.js');
const googleApiKey = config.analytics.googleId;

GoogleAnalytics.initialize(googleApiKey);

const withAnalytics = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  const HOC = class extends React.Component {
    componentDidMount () {
      const page = this.props.location.pathname;
      // track initial page
      trackPage(page);
    };
    componentWillReceiveProps (nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;
      // track each new page
      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    };
    render () {
      return <WrappedComponent {...this.props} />;
    };
  };

  return HOC;
};

export default withAnalytics;
