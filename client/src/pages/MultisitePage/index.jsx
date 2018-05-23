import React from 'react';
import SEO from '@components/SEO';
import NavBar from '@containers/NavBar';

class MultisitePage extends React.Component {
  render () {
    return (
      <div>
        <SEO pageTitle={'Multisite'} pageUri={'multisite'} />
        <NavBar />
        <div className='row row--padded flex-container--row flex-container--center-center'>
          <div className='column column--8 column--med-10'>
              <p className='pull-quote'>Introducing Spee.ch Multisite</p>
              <p>Hi there!  My name is <a href={'https://github.com/billbitt'} target={'_blank'}>Bill</a>, and I’d like to speak with you about Spee.ch.  No, not ‘speech,’ ‘<i><a href={'https://spee.ch'} target={'_blank'}>Spee.ch.</a></i>’ You know what, just read on...</p>
              <h2>A Little Background</h2>
              <p>Wow, time flies!  A little over a year ago Spee.ch was nothing more than a glimmer in the eye of LBRY CEO Jeremy Kaufman.  At that time, the <a href={'https://lbry.io/faq/what-is-lbry'} target={'_blank'}>LBRY protocol</a> was still so early in its development, that there were no web-based applications for interacting with the LBRY blockchain. But then, something beautiful happened.  On March 29th, 2017, Jeremy sat down with Jack, and together they <a href={'https://www.youtube.com/watch?v=C9LCapt_OYw'} target={'_blank'}>live coded a single-page PHP site</a> that could publish images to the LBRY network.  And just like that, Spee.ch was born!</p>
              <p>Being that LBRY is an open source project, Jeremy ended the session by inviting community members who were interested in the project to take the reigns and see where Spee.ch could go.  I was one of the devs that did just that, and it wasn’t long before I was on a weekly call dedicated to this project with contributors from around the world.</p>
              <p>At this point in time, the vision for Spee.ch was pretty simple: create a web-based hosting service that used the LBRY network as a database for free image and video sharing.  In other words, an ‘imgur on the blockchain.’</p>
              <h2>Growth</h2>
              <p>You might be wondering, “So, what has the Spee.ch team been doing since then?”. Well, that is a great question. I’m glad you asked.</p>
              <p>As it turned out, the initial single-serving site was only the beginning.  We wanted to add more features, improve user experience, and continue to rapidly innovate on new ideas to explore what web-based image-hosting on the blockchain could look like.  And now -- a couple of re-designs, <a href={'https://github.com/lbryio/spee.ch'} target={'_blank'}>1,428 commits</a>, and <a href={'https://github.com/lbryio/spee.ch/graphs/contributors'} target={'_blank'}>18 contributors</a> later (as of the time of this writing) -- we’ve been through a lot of changes.  We changed the URL scheme, switched out the PHP for Javascript (sorry Jeremy!), added more HTML pages, removed those HTML pages, added Handlebars, removed most of Handlebars, added React, and... you get the picture.</p>
              <p>It’s been a lot of work, and through all of these changes, we have been guided by our original vision: develop a free web app that allows users to share images and video using a blockchain.</p>
              <p>However, we ask ourselves constantly: what else can we be doing?  What can we be doing differently?  What features can we be doing better?  And it is those kinds of questions that lead us to this post.</p>
              <h2>A New Initiative</h2>
              <p>As Spee.ch developed, we were lucky to find an amazing community spring up around the project that contributed bug reports, bug fixes, feature requests, pull requests, etc., but ultimately we are limited by the hours we have in the day, and while some requests get prioritized, others get shelved. </p>
              <p>So we started wondering:  What if instead of having the community help us build our platform, we started helping them build theirs?  We started mulling this over, and the more we thought about it the more we liked it. And thus, Spee.ch Multisite was born.</p>
              <h2>Spee.ch Multisite</h2>
              <p>The vision for Spee.ch Multisite is to maintain a foundational codebase that will support a greater variety of content-sharing web apps built on LBRY, allowing these apps to publish and retrieve content from the network via the blockchain.</p>
              <h3>Run Your Own Spee.ch!</h3>
              <p>Ok, here’s the tl:dr: the purpose of the Spee.ch Multisite initiative is to enable you to run your own version of Spee.ch.</p>
              <p>Spee.ch Multisite will provide a helpful set of basic code to get you going, but we purposefully want to give you control and provide a sandbox in which you can develop the look, content, and features for your site.  The shared code base will be developed to support you in that quest. </p>
              <p>So if you don’t want your site called or looking anything like Spee.ch, we encourage that! Don’t hesitate to make it your own!</p>
              <h3>For the Community by the Community</h3>
              <p>Initially, sites built on Spee.ch Multisite will look a lot like Spee.ch, but you will be able to add custom pages, update the look of components, and limit the content on your spee.ch site as you see fit.</p>
              <p>Over time, it is our hope that the project will grow to incorporate many more components and features developed by us and the community to support a wide variety of functionalities beyond what the current spee.ch site is capable of.</p>
              <h3>A Common Codebase</h3>
              <p>If you have been following the project, you may have already noticed that the original github repository has grown into three: <a href={'https://github.com/lbryio/www.spee.ch'} target={'_blank'}>www.spee.ch</a>, <a href={'https://github.com/lbryio/spee.ch'} target={'_blank'}>spee.ch</a>, and <a href={'https://github.com/lbryio/spee.ch-components'} target={'_blank'}>spee.ch-components</a>.  I will save the specifics for a future tech-focused blog post in the coming weeks, but the reason for these changes is to modularise the code so that is it easier for anyone who wants to run their own version of Spee.ch to do so, and to be able to customize their Spee.ch to their liking.</p>
              <h3>What About the Flagship Spee.ch Site?</h3>
              <p>Don’t worry!  If you like using <a href={'https://spee.ch'} target={'_blank'}>Spee.ch</a> and have no intention of running your own site, we will still be here running it for you!  We are dedicated to pushing it forward and using it as patient zero for all additions to the Spee.ch Multisite codebase.</p>
              <h2>Join Us</h2>
              <p>Friday, May 18, we will be hosting a live demo showcasing the alpha version of Spee.ch Multisite.  It’s still quite young, but that’s the point: we want to realize this vision together.</p>
              <p><b><a href={'https://speech.rsvpify.com/'} target={'_blank'}>CLICK HERE TO RSVP!</a></b></p>
              <p>At this first demonstration, we will walk through preparing a server environment, installing LBRY and Spee.ch, and how to make local changes to your Spee.ch instance.  Details below:</p>
              <ul>
                <li>When: Friday, May 18, 2018</li>
                <li>Time: 5:00 p.m. PST</li>
                <li>Where: Google Hangouts</li>
                <li>Link: <a href={'https://meet.google.com/aex-ghqg-kcs'} target={'_blank'}>meet.google.com/aex-ghqg-kcs</a></li>
                <li>System Requirements: If you have a server, please make sure you have MySql, Node and NPM installed. If you need help installing the above, or if you need a server to run your own instance on, please join the Hangout 30 minutes ahead of time and we will help get you set up =]</li>
                <li>Questions: hello@lbry.io</li>
              </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default MultisitePage;
