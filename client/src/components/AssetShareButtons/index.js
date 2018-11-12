import React from 'react';
import SocialShareLink from '@components/SocialShareLink';

const AssetShareButtons = ({ assetUrl, name }) => {
  return (
    <SocialShareLink >
      <a
        className='link--primary twitter'
        target='_blank'
        href={`https://twitter.com/intent/tweet?text=${assetUrl}`}
      >
        <img src='/assets/img/icn_twitter.svg' />
      </a>
      <a
        className='link--primary facebook'
        target='_blank'
        href={`https://www.facebook.com/sharer/sharer.php?u=${assetUrl}`}
      >
        <img src='/assets/img/icn_facebook.svg' />
      </a>
      <a
        className='link--primary tumblr'
        target='_blank'
        href={`https://tumblr.com/widgets/share/tool?canonicalUrl=${assetUrl}`}
      >
        <img src='/assets/img/icn_tumblr.svg' />
      </a>
      <a
        className='link--primary reddit'
        target='_blank'
        href={`https://www.reddit.com/submit?url=${assetUrl}&title=${name}`}
      >
        <img src='/assets/img/icn_reddit.svg' />
      </a>
    </SocialShareLink>
  );
};
//
// Additional icons disabled. If you want to add additional icons, you have to solve
// https://github.com/lbryio/spee.ch/issues/687
//
// <a
//   className='link--primary'
//   target='_blank'
//   href={`https://sharetomastodon.github.io/?title=${name}&url=${assetUrl}`}
// >
//   mastodon
// </a>
// <a
//   className='link--primary'
//   target='_blank'
//   href={`https://share.diasporafoundation.org/?title=${name}&url=${assetUrl}`}
// >
//   diaspora
// </a>

export default AssetShareButtons;
