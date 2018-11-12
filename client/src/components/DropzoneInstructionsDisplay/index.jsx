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
        <span className={'text--large'}>{message}</span>
      </Row>
      <Row>
        <span className={'text--small text--secondary'}>OR</span>
      </Row>
      { fileError ? (
        <div>
          <Row>
            <span className={'text--large dropzone-instructions-display__chooser-label'}>CHOOSE FILE</span>
          </Row>
          <FormFeedbackDisplay
            errorMessage={fileError}
            defaultMessage={false}
          />
        </div>
      ) : (
        <span className={'text--large dropzone-instructions-display__chooser-label'}>CHOOSE FILE</span>
      )}
    </div>
  );
};

export default DropzoneInstructionsDisplay;
