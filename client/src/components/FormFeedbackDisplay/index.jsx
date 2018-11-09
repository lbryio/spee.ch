import React from 'react';

const FormFeedbackDisplay = ({ errorMessage, defaultMessage }) => {
  return (
    <div className={'form-feedback'}>
      { errorMessage ? (
        <span className={'text--small text--failure'}>{errorMessage}</span>
      ) : (
        <div>
          { defaultMessage ? (
            <span className={'text--small text--secondary'}>{defaultMessage}</span>
          ) : (
            <span className={'text--small'}>&nbsp;</span>
          )}
        </div>
      )}
    </div>
  );
};

export default FormFeedbackDisplay;
