import React from 'react';
import { Link } from 'react-router-dom';
import createCanonicalLink from '@globalutils/createCanonicalLink';
import * as Icon from 'react-feather';
import Img from 'react-image';

const AssetPreview = ({ defaultThumbnail, claimData }) => {
  const {name, fileExt, contentType, thumbnail, title, blocked, transactionTime = 0} = claimData;
  const showUrl = createCanonicalLink({asset: {...claimData}});
  console.log(transactionTime)
  const embedUrl = `${showUrl}.${fileExt}`;
  const ago = Date.now() / 1000 - transactionTime;
  const dayInSeconds = 60 * 60 * 24;
  const monthInSeconds = dayInSeconds * 30;
  let when;

  if (ago < dayInSeconds || transactionTime < 1) {
    when = 'Just today';
  } else if (ago < monthInSeconds) {
    when = `${Math.floor(ago / dayInSeconds)} d ago`;
  } else {
    when = `${Math.floor(ago / monthInSeconds)} mo ago`;
  }
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
        <div className='asset-preview__image-box'>
          <Img
            src={[
              thumb,
              defaultThumbnail,
              '/assets/img/default_thumb.jpg',
            ]}
            alt={name}
            className={'asset-preview__image'}
          />
        </div>

        <div className={'asset-preview__label'}>

          <div className={'asset-preview__label-text'}>
            <p>{title}</p>
          </div>
          <div className={'asset-preview__label-info '}>
            <div className={'asset-preview__label-info-datum'}>
              <div className={'svg-icon'}>
                { media === 'image' && <Icon.Image />}
                { media === 'text' && <Icon.FileText />}
                { media === 'video' && contentType === 'video/mp4' && <Icon.Video />}
                { media !== 'image' && media !== 'text' && contentType !== 'video/mp4' && <Icon.File />}
              </div>
              <div>{fileExt}</div>
            </div>

            <div className={'asset-preview__label-info-datum'}>
              <div>{when}</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

export default AssetPreview;
