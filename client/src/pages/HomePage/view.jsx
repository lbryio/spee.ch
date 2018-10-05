import React from 'react';
import PageLayout from '@components/PageLayout';
import PublishTool from '@containers/PublishTool';
import ContentPageWrapper from '@pages/ContentPageWrapper';

class HomePage extends React.Component {
  render () {
    const { homeChannel } = this.props;
    return homeChannel ? (
      <ContentPageWrapper homeChannel={homeChannel} />
    ) : (
      <PageLayout
        pageTitle={'Speech'}
        pageUri={''}
      >
        <PublishTool />
      </PageLayout>
    );
  }
};

export default HomePage;
