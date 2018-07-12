import React from 'react';
import { Link } from 'react-router-dom';

const AssetPreview = ({ defaultThumbnail, claimData: { name, claimId, fileExt, contentType, thumbnail } }) => {
  const directSourceLink = `asset/${name}/${claimId}`;
  const showUrlLink = `/${claimId}/${name}`;
  return (
    <Link to={showUrlLink} >
      {(() => {
        switch (contentType) {
          case 'image/jpeg':
          case 'image/jpg':
          case 'image/png':
          case 'image/gif':
            return (
              <img
                className={'asset-preview-image'}
                src={directSourceLink}
                alt={name}
              />
            );
          case 'video/mp4':
            return (
              <img
                className={'asset-preview-video'}
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
  );
};

export default AssetPreview;
