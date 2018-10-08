import React from 'react';
import SocialShareLink from '@components/SocialShareLink';

const AssetShareButtons = ({ host, name, shortId }) => {
  return (
    <SocialShareLink >
      <a
        className='link--primary'
        target='_blank'
        href={`https://twitter.com/intent/tweet?text=${host}/${shortId}/${name}`}
      >
        twitter
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://www.facebook.com/sharer/sharer.php?u=${host}/${shortId}/${name}`}
      >
        facebook
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`http://tumblr.com/widgets/share/tool?canonicalUrl=${host}/${shortId}/${name}`}
      >
        tumblr
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://www.reddit.com/submit?url=${host}/${shortId}/${name}&title=${name}`}
      >
        reddit
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://sharetomastodon.github.io/?title=${name}&url=${host}/${shortId}/${name}`}
      >
        mastodon
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://share.diasporafoundation.org/?title=${name}&url=${host}/${shortId}/${name}`}
      >
        diaspora
      </a>
    </SocialShareLink>
  );
};

export default AssetShareButtons;
