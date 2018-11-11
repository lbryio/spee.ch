import React from 'react';
import PageLayout from '@components/PageLayout';
import PublishTool from '@containers/PublishTool';
import ContentPageWrapper from '@pages/ContentPageWrapper';

import Creatify from '@components/Creatify';

class HomePage extends React.Component {
  componentWillUnmount () {
    this.props.clearFile();
  }
  render () {
    const { homeChannel } = this.props;
    return homeChannel ? (
      <ContentPageWrapper homeChannel={homeChannel} />
    ) : (
      <PageLayout
        pageTitle={'Speech'}
        pageUri={''}
      >
        <Creatify />
        <PublishTool />
      </PageLayout>
    );
  }
};

export default HomePage;
