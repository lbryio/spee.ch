import React from 'react';

const AssetShareButtons = ({ host, name, shortId }) => {
  return (
    <div className='share-buttons'>
      <a
        className='link--primary'
        target='_blank'
        href={`https://twitter.com/intent/tweet?text=${host}/${shortId}/${name}`}
      >
        <img src='/assets/img/icn_twitter.svg' />
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://www.facebook.com/sharer/sharer.php?u=${host}/${shortId}/${name}`}
      >
        <img src='/assets/img/icn_facebook.svg' />
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`http://tumblr.com/widgets/share/tool?canonicalUrl=${host}/${shortId}/${name}`}
      >
        <img src='/assets/img/icn_tumblr.svg' />
      </a>
      <a
        className='link--primary'
        target='_blank'
        href={`https://www.reddit.com/submit?url=${host}/${shortId}/${name}&title=${name}`}
      >
        <img src='/assets/img/icn_reddit.svg' />
      </a>
    </div>
  );
};

export default AssetShareButtons;
