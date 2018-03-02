import React from 'react';
import { Link } from 'react-router-dom';

const AssetPreview = ({ name, claimId, fileExt, contentType }) => {
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
              return (
                <img className={'asset-preview'} src={directSourceLink} alt={name} />
              );
            case 'image/gif':
              return (
                <img className={'asset-preview'} src={directSourceLink} alt={name} />
              );
            case 'video/mp4':
              return (
                <video className={'asset-preview'}>
                  <source src={directSourceLink} type={contentType} />
                </video>
              );
            case 'video/ogg':
              return (
                <video className={'asset-preview'}>
                  <source src={directSourceLink} type={contentType} />
                </video>
              );
            case 'video/webm':
              return (
                <video className={'asset-preview'}>
                  <source src={directSourceLink} type={contentType} />
                </video>
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
