import React from 'react';
import Row from '@components/Row';

const AboutSpeechDetails = () => {
  return (
    <div>
      <Row>
        <p className={'text--large'}>
          Spee.ch's journey may be on hold, but LBRY is still on mission. We'd like to thank all of our testers and early adopters for helping us explore this use case.
          We're really excited about <a className='link--primary' href='https://lbry.tv' target='_blank'>lbry.tv</a> and can't wait to see you over there for a fully featured experience.
        </p>
      </Row>
    </div>
  );
};

export default AboutSpeechDetails;
