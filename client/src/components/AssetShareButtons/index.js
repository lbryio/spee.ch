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
        <img src='/assets/img/twitter.svg' />
      </a>
      <a
        className='link--primary facebook'
        target='_blank'
        href={`https://www.facebook.com/sharer/sharer.php?u=${assetUrl}`}
      >
        <img src='/assets/img/facebook.svg' />
      </a>
      <a
        className='link--primary tumblr'
        target='_blank'
        href={`https://tumblr.com/widgets/share/tool?canonicalUrl=${assetUrl}`}
      >
        <img src='/assets/img/tumblr.svg' />
      </a>
      <a
        className='link--primary reddit'
        target='_blank'
        href={`https://www.reddit.com/submit?url=${assetUrl}&title=${name}`}
      >
        <img src='/assets/img/reddit.svg' />
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://sharetomastodon.github.io/?title=${name}&url=${assetUrl}`}
      >
        mastodon
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://share.diasporafoundation.org/?title=${name}&url=${assetUrl}`}
      >
        diaspora
      </a>
    </SocialShareLink>
  );
};

export default AssetShareButtons;
