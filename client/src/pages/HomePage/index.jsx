import React from 'react';
import PageLayout from '@components/PageLayout';
import HomePageContent from '@components/HomePageContent';

class HomePage extends React.Component {
  render () {
    return (
      <PageLayout pageTitle={'Speech'} pageUri={''}>
        <HomePageContent />
      </PageLayout>
    );
  }
};

export default HomePage;
