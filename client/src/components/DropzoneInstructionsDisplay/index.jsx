import React from 'react';
import FormFeedbackDisplay from '@components/FormFeedbackDisplay';

const DropzoneInstructionsDisplay = ({fileError}) => {
  return (
    <div className={'dropzone-instructions-display'}>
      <p className={'text--large'}>Drag & drop image or video here to publish</p>
      <p className={'text--small'}>OR</p>
      <p className={'text--large text--underline'}>CHOOSE FILE</p>
      <FormFeedbackDisplay
        errorMessage={fileError}
        defaultMessage={false}
      />
    </div>
  );
};

export default DropzoneInstructionsDisplay;
