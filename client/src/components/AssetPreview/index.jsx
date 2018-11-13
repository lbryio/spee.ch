import React from 'react';
import { Link } from 'react-router-dom';
import createCanonicalLink from '../../../../utils/createCanonicalLink';

const AssetPreview = ({ defaultThumbnail, claimData }) => {
  const {name, fileExt, contentType, thumbnail, title} = claimData;
  const showUrl = createCanonicalLink({asset: {...claimData}});
  const embedUrl = `${showUrl}.${fileExt}`;
  switch (contentType) {
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
    case 'image/gif':
      return (
        <Link to={showUrl} className='asset-preview'>
          <div>
            <img
              className={'asset-preview-image'}
              src={embedUrl}
              alt={name}
            />
            <h3 className='list-title'>{title}</h3>
          </div>
        </Link>
      );
    case 'video/mp4':
      return (
        <Link to={showUrl} className='asset-preview'>
          <div>
            <img
              className={'asset-preview-video'}
              src={thumbnail || defaultThumbnail}
              alt={name}
            />
            <h3 className='list-title'>{title}</h3>
          </div>
        </Link>
      );
    default:
      return null;
  }
};

export default AssetPreview;
