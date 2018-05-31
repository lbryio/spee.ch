import React from 'react';

import AboutSpeechOne from '@components/AboutSpeechOne';
import AboutSpeechTwo from '@components/AboutSpeechTwo';
import HorizontalSplit from '@components/HorizontalSplit';

const AboutPageContent = () => {
  return (
    <HorizontalSplit
      leftSide={<AboutSpeechOne />}
      rightSide={<AboutSpeechTwo />}
    />
  );
};

export default AboutPageContent;
