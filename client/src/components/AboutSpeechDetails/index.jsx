import React from 'react';

const AboutSpeechDetails = () => {
  return (
    <div>
      <p>Spee.ch is a media-hosting site that reads from and publishes content to the <a className='link--primary' href='https://lbry.io'>LBRY</a> blockchain.</p>
      <p>Spee.ch is a hosting service, but with the added benefit that it stores your content on a decentralized network of computers -- the <a className='link--primary' href='https://lbry.io/get'>LBRY</a> network.  This means that your images are stored in multiple locations without a single point of failure.</p>
      <h3>Contribute</h3>
      <p>If you have an idea for your own spee.ch-like site on top of LBRY, fork our <a className='link--primary' href='https://github.com/lbryio/spee.ch'>github repo</a> and go to town!</p>
      <p>If you want to improve spee.ch, join our <a className='link--primary' href='https://chat.lbry.io'>discord channel</a> or solve one of our <a className='link--primary' href='https://github.com/lbryio/spee.ch/issues'>github issues</a>.</p>
    </div>
  );
};

export default AboutSpeechDetails;
