import React from 'react';
import PageLayout from '@components/PageLayout';
import HorizontalSplit from '@components/HorizontalSplit';
import AboutSpeechOne from '@components/AboutSpeechOne';
import AboutSpeechTwo from '@components/AboutSpeechTwo';


class AboutPage extends React.Component {
  render () {
    return (
      <PageLayout pageTitle={'About'} pageUri={'about'} >
        <HorizontalSplit
          leftSide={<AboutSpeechOne />}
          rightSide={<AboutSpeechTwo />}
        />
      </PageLayout>
    );
  }
};

export default AboutPage;
