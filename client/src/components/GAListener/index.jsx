import React from 'react';
import GoogleAnalytics from 'react-ga';
import { withRouter } from 'react-router-dom';

const customGAListener = (siteConfig) => {
    const { analytics: { googleId } } = siteConfig;

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

    return withRouter(GAListener);
};

export default customGAListener;
