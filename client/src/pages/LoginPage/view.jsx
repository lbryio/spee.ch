import React from 'react';
import { withRouter } from 'react-router-dom';
import PageLayout from '@components/PageLayout';
import HorizontalSplit from '@components/HorizontalSplit';

import AboutChannels from '@components/AboutChannels';
import ChannelTools from '@components/ChannelTools';

class LoginPage extends React.Component {
  componentWillReceiveProps (newProps) {
    // re-route the user to the homepage if the user is logged in
    if (newProps.loggedInChannelName !== this.props.loggedInChannelName) {
      this.props.history.push(`/`);
    }
  }
  render () {
    return (
      <PageLayout pageTitle={'Login'} pageUri={'login'} >
        <HorizontalSplit
          leftSide={<AboutChannels />}
          rightSide={<ChannelTools />}
        />
      </PageLayout>
    );
  }
};

export default withRouter(LoginPage);
