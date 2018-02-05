import React from 'react';
import { Link } from 'react-router-dom';

const AssetPreview = ({ name, claimId, fileExt, contentType }) => {
  const directSourceLink = `${claimId}/${name}.${fileExt}`;
  const showUrlLink = `${claimId}/${name}`;
  const previewHolderStyle = {
    clear  : 'both',
    display: 'inline-block',
    width  : '31%',
    padding: '0px',
    margin : '1%',
  };
  const assetStyle = {
    width  : '100%',
    padding: '0px',
    margin : '0px',
  };
  return (
    <div style={previewHolderStyle}>
      <Link to={showUrlLink} >
        {(() => {
          switch (contentType) {
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/png':
              return (
                <img style={assetStyle} className={'asset-preview--image'} src={directSourceLink} alt={name}/>
              );
            case 'image/gif':
              return (
                <img style={assetStyle} className={'asset-preview--gif'} src={directSourceLink} alt={name}/>
              );
            case 'video/mp4':
              return (
                <video style={assetStyle}>
                  <source src={directSourceLink} type={contentType}/>
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
