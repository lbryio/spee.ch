import React from 'react';
import { Link } from 'react-router-dom';

const AssetPreview = ({ defaultThumbnail, claimData: { name, claimId, fileExt, contentType, thumbnail } }) => {
  const directSourceLink = `${claimId}/${name}.${fileExt}`;
  const showUrlLink = `/${claimId}/${name}`;
  return (
    <div className='asset-holder'>
      <Link to={showUrlLink} >
        {(() => {
          switch (contentType) {
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/png':
            case 'image/gif':
              return (
                <img
                  className={'asset-preview'}
                  src={directSourceLink}
                  alt={name}
                />
              );
            case 'video/mp4':
              return (
                <img
                  className={'asset-preview video'}
                  src={thumbnail || defaultThumbnail}
                  alt={name}
                />
              );
            default:
              return (
                <p>unsupported file type</p>
              );
          }
        })()}
      </Link>
    </div>
  );
};

export default AssetPreview;
