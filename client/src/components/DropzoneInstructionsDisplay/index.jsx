import React from 'react';

const DropzoneInstructionsDisplay = ({fileError}) => {
  return (
    <div className='dropzone-instructions-display'>
      <p className='info-message-placeholder info-message--failure' id='input-error-file-selection'>{fileError}</p>
      <p>Drag & drop image or video here to publish</p>
      <p className='fine-print'>OR</p>
      <p className='text--underline'>CHOOSE FILE</p>
    </div>
  );
};

export default DropzoneInstructionsDisplay;
