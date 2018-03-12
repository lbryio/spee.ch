import React from 'react';
import NavBar from 'containers/NavBar';
import SEO from 'components/SEO';

class AboutPage extends React.Component {
  render () {
    return (
      <div>
        <SEO pageTitle={'About'} pageUri={'about'} />
        <NavBar />
        <div className='row row--padded'>
          <div className='column column--5 column--med-10 align-content-top'>
            <div className='column column--8 column--med-10'>
              <p className='pull-quote'>Spee.ch is an open-source project.  Please contribute to the existing site, or fork it and make your own.</p>
              <p><a className='link--primary' target='_blank' href='https://twitter.com/spee_ch'>TWITTER</a></p>
              <p><a className='link--primary' target='_blank' href='https://github.com/lbryio/spee.ch'>GITHUB</a></p>
              <p><a className='link--primary' target='_blank' href='https://discord.gg/YjYbwhS'>DISCORD CHANNEL</a></p>
              <p><a className='link--primary' target='_blank' href='https://github.com/lbryio/spee.ch/blob/master/README.md'>DOCUMENTATION</a></p>
            </div>
          </div><div className='column column--5 column--med-10 align-content-top'>
            <div className='column column--8 column--med-10'>
              <p>Spee.ch is a media-hosting site that reads from and publishes content to the <a className='link--primary' href='https://lbry.io'>LBRY</a> blockchain.</p>
              <p>Spee.ch is a hosting service, but with the added benefit that it stores your content on a decentralized network of computers -- the <a className='link--primary' href='https://lbry.io/get'>LBRY</a> network.  This means that your images are stored in multiple locations without a single point of failure.</p>
              <h3>Contribute</h3>
              <p>If you have an idea for your own spee.ch-like site on top of LBRY, fork our <a className='link--primary' href='https://github.com/lbryio/spee.ch'>github repo</a> and go to town!</p>
              <p>If you want to improve spee.ch, join our <a className='link--primary' href='https://discord.gg/YjYbwhS'>discord channel</a> or solve one of our <a className='link--primary' href='https://github.com/lbryio/spee.ch/issues'>github issues</a>.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AboutPage;
