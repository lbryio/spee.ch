import React from 'react';
import PageLayout from '@components/PageLayout';
import HorizontalSplit from '@components/HorizontalSplit';
import AboutSpeechOverview from '@components/AboutSpeechOverview';
import AboutSpeechDetails from '@components/AboutSpeechDetails';

class AboutPage extends React.Component {
  render () {
    return (
      <PageLayout pageTitle={'About'} pageUri={'about'} >
        <HorizontalSplit
          leftSide={<AboutSpeechOverview />}
          rightSide={<AboutSpeechDetails />}
        />
      </PageLayout>
    );
  }
};

export default AboutPage;
