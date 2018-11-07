import React from 'react';
import FormFeedbackDisplay from '@components/FormFeedbackDisplay';
import Row from '@components/Row';

const DropzoneInstructionsDisplay = ({fileError, message}) => {
  if (!message) {
    message = 'Drag & drop image or video here to publish';
  }
  return (
    <div className={'dropzone-instructions-display'}>
      <Row>
        <p className={'text--large'}>{message}</p>
      </Row>
      <Row>
        <p className={'text--small'}>OR</p>
      </Row>
      { fileError ? (
        <div>
          <Row>
            <p className={'text--large text--underline'}>CHOOSE FILE</p>
          </Row>
          <FormFeedbackDisplay
            errorMessage={fileError}
            defaultMessage={false}
          />
        </div>
      ) : (
        <p className={'text--large text--underline'}>CHOOSE FILE</p>
      )}
    </div>
  );
};

export default DropzoneInstructionsDisplay;
