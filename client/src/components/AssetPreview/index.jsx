import React from 'react';
import { Link } from 'react-router-dom';
import createCanonicalLink from '../../../../utils/createCanonicalLink';

const AssetPreview = ({ defaultThumbnail, claimData }) => {
  const {name, fileExt, contentType, thumbnail, title, blocked} = claimData;
  const showUrl = createCanonicalLink({asset: {...claimData}});
  const embedUrl = `${showUrl}.${fileExt}`;

  /*
  This blocked section shouldn't be necessary after pagination is reworked,
  though it might be useful for channel_mine situations.
  */

  if (blocked) {
    return (
      <div className='asset-preview'>
        <div className='asset-preview__blocked'>
          <h3>Error 451</h3>
          <p>This content is blocked for legal reasons.</p>
        </div>
        <h3 className='asset-preview__title'>Blocked Content</h3>
      </div>
    );
  } else {
    switch (contentType) {
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
      case 'image/gif':
        return (
          <Link to={showUrl} className='asset-preview'>
            <img
              className={'asset-preview__image'}
              src={embedUrl}
              alt={name}
            />
            <h3 className='asset-preview__title'>{title}</h3>
          </Link>
        );
      case 'video/mp4':
        return (
          <Link to={showUrl} className='asset-preview'>
            <div className='asset-preview__play-wrapper'>
              <img
                className={'asset-preview__video'}
                src={thumbnail || defaultThumbnail}
                alt={name}
              />
              <div className='asset-preview__play-overlay' />
            </div>
            <h3 className='asset-preview__title'>{title}</h3>
          </Link>
        );
      default:
        return null;
    }
  }
};

export default AssetPreview;
