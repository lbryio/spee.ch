import React from 'react';

const AssetShareButtons = ({ host, name, shortId }) => {
  return (
    <div className='share-buttons'>
      <a
        className='link--primary twitter'
        target='_blank'
        href={`https://twitter.com/intent/tweet?text=${host}/${shortId}/${name}`}
      >
        <img src='/assets/img/twitter.svg' />
      </a>
      <a
        className='link--primary facebook'
        target='_blank'
        href={`https://www.facebook.com/sharer/sharer.php?u=${host}/${shortId}/${name}`}
      >
        <img src='/assets/img/facebook.svg' />
      </a>
      <a
        className='link--primary tumblr'
        target='_blank'
        href={`http://tumblr.com/widgets/share/tool?canonicalUrl=${host}/${shortId}/${name}`}
      >
        <img src='/assets/img/tumblr.svg' />
      </a>
      <a
        className='link--primary reddit'
        target='_blank'
        href={`https://www.reddit.com/submit?url=${host}/${shortId}/${name}&title=${name}`}
      >
        <img src='/assets/img/reddit.svg' />
      </a>
    </div>
  );
};

export default AssetShareButtons;
