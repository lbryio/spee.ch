import React from 'react';
import PageLayout from '@components/PageLayout';
import Row from '@components/Row';

class FaqPage extends React.Component {
  render () {
    return (
      <PageLayout
        pageTitle={'Frequently Asked Questions'}
        pageUri={'tos'}
      >
        <Row>
          <Row>
            <h1>Frequently Asked Questions</h1>
          </Row>
          <Row>
            <h3>What is spee.ch?</h3>
            <p>Spee.ch is a media-hosting site that reads from and publishes content to the <a href='http://lbry.io/'>LBRY blockchain</a>.</p>
          </Row>
          <Row>
            <h3>OK But Why Should I Care?</h3>
            <p>Spee.ch is a fast and easy way to host your images, videos, and other content. What makes this different from other similar sites is that Spee.ch is hosted on the LBRY blockchain. That means it is impossible for your content to be censored via digital means. Even if we took down Spee.ch today, all content would remain immutably stored on the LBRY blockchain.</p>
            <p>Blockchain technology doesn’t solve <a href='https://xkcd.com/538/'>the 5 dollar wrench attack</a>, but it solves just about every other problem in media hosting and distribution.</p>
            <p>Even better - you can host your own clone of Spee.ch to get even more control over your content. <a href='https://github.com/lbryio/spee.ch/blob/master/README.md'>CLICK HERE FOR INFO</a>.</p>
            <p>Spee.ch is just the beginning of what will soon be a vibrant ecosystem of LBRY-powered apps. Use LBRY and you’re one step closer to true freedom.</p>
          </Row>
          <Row>
            <h3>How to Use spee.ch</h3>
            <p>It’s easy. Drag the image or video file of your choice into the center of the spee.ch homepage.</p>
            <p>Spee.ch is currently best suited for web optimized MP4 video and standard image filetypes (JPEG, PNG, GIF).</p>
            <p>If you want to refer to a piece of content repeatedly, or to build a collection of related content, you could create a channel. Channels work both for private collections and for public repositories. There’s more info about how to do this <a href='https://spee.ch/login'>on the channel page</a>.</p>
            <p>Published files will be viewable and embeddable with any web browser and accesible in the LBRY app. You can also use spee.ch to view free and non-NSFW content published on LBRY network from LBRY app. You just need to replace "lbry://" with "http://spee.ch/" in the URL.</p>
          </Row>
          <Row>
            <h3>How Long Does Content Stay on Spee.ch?</h3>
            <p>All content uploaded on spee.ch is guaranteed to stay up for at least 10 years with no maintenance. Future updates will likely extend that time horizon further as blockchain technology improves.</p>
          </Row>
          <Row>
            <h3>Contribute</h3>
            <p>If you have an idea for your own spee.ch-like site on top of LBRY, fork our <a href='https://github.com/lbryio/spee.ch'>github repo</a> and go to town!</p>
            <p>If you want to improve spee.ch, join <a href='https://chat.lbry.io/'>our discord channel</a> or solve one of our <a href='https://github.com/lbryio/spee.ch/issues'>github issues</a>.</p>
          </Row>
        </Row>
      </PageLayout>
    );
  }
}

export default FaqPage;
