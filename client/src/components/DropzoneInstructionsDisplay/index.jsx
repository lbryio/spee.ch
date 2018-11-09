import React from 'react';
import FormFeedbackDisplay from '@components/FormFeedbackDisplay';
import Row from '@components/Row';

const DropzoneInstructionsDisplay = ({fileError}) => {
  return (
    <div className={'dropzone-instructions-display'}>
      <Row>
        <span className={'text--large'}>Drag & drop image or video here to publish</span>
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
