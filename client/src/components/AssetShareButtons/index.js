import React from 'react';
import SocialShareLink from '@components/SocialShareLink';

const AssetShareButtons = ({ assetUrl, name }) => {
  return (
    <SocialShareLink >
      <a
        className='link--primary'
        target='_blank'
        href={`https://twitter.com/intent/tweet?text=${assetUrl}`}
      >
        twitter
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://www.facebook.com/sharer/sharer.php?u=${assetUrl}`}
      >
        facebook
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://tumblr.com/widgets/share/tool?canonicalUrl=${assetUrl}`}
      >
        tumblr
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://www.reddit.com/submit?url=${assetUrl}&title=${name}`}
      >
        reddit
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
