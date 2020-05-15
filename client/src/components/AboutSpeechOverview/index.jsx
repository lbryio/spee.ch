import React from 'react';
import Row from '@components/Row';

const AboutSpeechOverview = () => {
  return (
    <div>
      <Row>
        <p className={'text--extra-large'}>Lbry is no longer supporting Spee.ch. However, we're excited to show you <a className='link--primary' href='https://lbry.tv' target='_blank'>lbry.tv</a>!</p>
      </Row>
      <Row>
        <div className={'text--large'}>
          <a className='link--primary' target='_blank' href='https://twitter.com/lbry'>TWITTER</a><br/>
          <a className='link--primary' target='_blank' href='https://github.com/lbryio/'>GITHUB</a><br/>
          <a className='link--primary' target='_blank' href='https://discord.gg/YjYbwhS'>DISCORD CHANNEL</a><br/>
        </div>
      </Row>
    </div>
  );
};

export default AboutSpeechOverview;
