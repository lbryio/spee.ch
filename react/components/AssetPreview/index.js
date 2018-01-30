import React from 'react';

const AssetPreview = ({ name, claimId, contentType }) => {
  return (
    <div>
      <p>name: {name}, claimId: {claimId}, contentType: {contentType}</p>
    </div>
  );
};

export default AssetPreview;
