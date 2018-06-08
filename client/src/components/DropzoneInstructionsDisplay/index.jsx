import React from 'react';

const DropzoneInstructionsDisplay = ({fileError}) => {
  return (
    <div className='dropzone-instructions-display'>
      <p className={'large'}>
        Drag & drop image or video here to publish
      </p>
      <p className='small'>
        OR
      </p>
      <p className='large underline'>
        CHOOSE FILE
      </p>
      <p className='small form-feedback--failure'>
        {fileError}
      </p>
    </div>
  );
};

export default DropzoneInstructionsDisplay;
