import React from 'react';

const AssetPreview = ({ name, claimId, fileExt, contentType }) => {
  const directSourceLink = `${claimId}/${name}.${fileExt}`;
  const previewHolderStyle = {
    clear: 'both',
    display: 'inline-block',
    width: '31%',
    padding: '0px',
    margin: '1%',
    backgroundColor: 'black',
  };
  const assetStyle = {
    width: '100%',
    padding: '0px',
    margin: '0px',
  };
  switch (contentType) {
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
      return (
        <div style={previewHolderStyle}>
          <img style={assetStyle} className={'asset-preview--image'} src={directSourceLink} alt={name} />
        </div>
      );
    case 'image/gif':
      return (
        <div style={previewHolderStyle}>
          <img style={assetStyle} className={'asset-preview--gif'} src={directSourceLink} alt={name} />
        </div>
      );
    case 'video/mp4':
      return (
        <div style={previewHolderStyle}>
          <video style={assetStyle}>
            <source src={directSourceLink} type={contentType} />
          </video>
        </div>
      );
    default:
      return (
        <p>unsupported file type</p>
      );
  }
};

export default AssetPreview;
