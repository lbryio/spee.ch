import React from 'react';
import { Link } from 'react-router-dom';
import createCanonicalLink from '@globalutils/createCanonicalLink';
import * as Icon from 'react-feather';

const AssetPreview = ({ defaultThumbnail, claimData }) => {
  const {name, fileExt, contentType, thumbnail, title, blocked} = claimData;
  const showUrl = createCanonicalLink({asset: {...claimData}});
  const embedUrl = `${showUrl}.${fileExt}`;
  /*
  we'll be assigning media icon based on supported type / mime types
  */
  const media = contentType.split('/')[0];
  /*
  make sure thumb has the right url
   */
  const thumb = media === 'image' ? embedUrl : thumbnail;
  /*
  This blocked section shouldn't be necessary after pagination is reworked,
  though it might be useful for channel_mine situations.
  */

  if (blocked) {
    return (
      <div className='asset-preview'>
        <div className='asset-preview__blocked'>
          <p>Error 451</p>
          <p>This content is blocked for legal reasons.</p>
        </div>
        <div className={'asset-preview__label'}>
          <div className={'asset-preview__label-text'}>
            <p className='asset-preview__title text--medium'>Blocked Content</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Link to={showUrl} className='asset-preview'>
        <img
          className={'asset-preview__image'}
          src={thumb || defaultThumbnail}
          alt={name}
        />
        <div className={'asset-preview__label'}>
          <div className={'asset-preview__label-text'}>
            <p className='asset-preview__title text--medium'>{title}</p>
          </div>
          <div className={'asset-preview__label-info'}>
            <div className={'text--medium'}>
              { media === 'image' && <Icon.Image />}
              { media === 'text' && <Icon.FileText />}
              { media === 'video' && contentType === 'video/mp4' && <Icon.Video />}
              { media !== 'image' && media !== 'text' && contentType !== 'video/mp4' && <Icon.File />}
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

export default AssetPreview;
