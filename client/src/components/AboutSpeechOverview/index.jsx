import React from 'react';
import Row from '@components/Row';

const AboutSpeechOverview = () => {
  return (
    <div>
      <Row>
        <p className={'text--extra-large'}>Spee.ch is an open-source project.  Please contribute to the existing site, or fork it and make your own.</p>
      </Row>
      <Row>
        <div className={'text--large'}>
          <a className='link--primary' target='_blank' href='https://twitter.com/spee_ch'>TWITTER</a><br/>
          <a className='link--primary' target='_blank' href='https://github.com/lbryio/spee.ch'>GITHUB</a><br/>
          <a className='link--primary' target='_blank' href='https://discord.gg/YjYbwhS'>DISCORD CHANNEL</a><br/>
          <a className='link--primary' target='_blank' href='https://github.com/lbryio/spee.ch/blob/master/README.md'>DOCUMENTATION</a><br/>
        </div>
      </Row>
    </div>
  );
};

export default AboutSpeechOverview;
