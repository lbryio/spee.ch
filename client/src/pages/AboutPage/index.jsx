import React from 'react';
import PageLayout from '@components/PageLayout';
import AboutPageContent from '@components/AboutPageContent';

class AboutPage extends React.Component {
  render () {
    return (
      <PageLayout pageTitle={'About'} pageUri={'about'} >
        <AboutPageContent />
      </PageLayout>
    );
  }
};

export default AboutPage;
